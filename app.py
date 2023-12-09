from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date, timedelta
from flask_compress import Compress
app = Flask(__name__)
app.config['COMPRESS_MIMETYPES'] = ['text/html', 'text/css', 'text/xml', 'application/json', 'application/javascript']
app.config['COMPRESS_BR'] = False
app.config['COMPRESS_LEVEL'] = 6
app.config['COMPRESS_ALGORITHM'] = 'gzip'
app.config['JWT_SECRET_KEY'] = 'my_personal_budget_secret_key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=15)
Compress(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "supports_credentials": True}})
jwt = JWTManager(app)

# Your Google Web Client ID
# GOOGLE_CLIENT_ID = "your_google_client_id"
def get_cursor():
    """
    Get a new cursor for the given MySQL connection.
    """
    db_config = {
        'host': '127.0.0.1',
        'user': 'root',
        'password': 'ichcha@09',
        'database': 'MyBudget',

    }
    conn = mysql.connector.connect(**db_config)
    return conn.cursor(dictionary=True),conn
@app.route('/api/', methods=['GET'])
def healthcheck():
    print("healthcheck")
    return "check ok!"

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        birthdate = data.get('birthdate')

        if not username or not password:
            return jsonify({'error': 'Missing username or password'}), 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        cursor, conn = get_cursor()
        cursor.execute("INSERT INTO users (username, password,email,birthdate) VALUES (%s, %s , %s, %s)",
                       (username, hashed_password,email,birthdate))
        conn.commit()

        return jsonify({'message': 'Signup successful'})
    except Exception as e:
        return jsonify({'message': f'Errorr{e}'})


@app.route('/api/login', methods=['POST'])
def login():
    print("logging in ")
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(data)

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400
    cursor,conn=get_cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    # printnt(check_password_hash(user['password'], password))
    if user and check_password_hash(user['password'], password):
        access_token = create_access_token(identity=username)
        return jsonify({'access_token':access_token,'user':user}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/api/user',methods=['GET'])
def fetch_user():
    try:
        current_user = get_jwt_identity()
        cursor, conn = get_cursor()
        cursor.execute(
            "SELECT id, email, username, birthdate FROM users WHERE id = (SELECT id FROM users WHERE username = %s)",
            (current_user,))
        user = cursor.fetchall()
        print(user)
    except Exception as e:
        return jsonify({'message': f'Errorr{e}'})
    return jsonify({'user': user})


@app.route('/api/budget', methods=['GET'])
@jwt_required()
def get_budget():
    current_user = get_jwt_identity()
    cursor, conn = get_cursor()
    cursor.execute(
        "SELECT id as budget_id, criterion, amount,month FROM budget WHERE user_id = (SELECT id FROM users WHERE username = %s)", (current_user,))
    budget = cursor.fetchall()
    return jsonify({'budget': budget})


def map_month_numbers_to_names(month_numbers):
    month_names = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }

    # Use the map function to apply the mapping to each element in the list
    month_names_list = list(map(lambda num: month_names.get(num, 'Invalid month'), month_numbers))

    return month_names_list

@app.route('/api/chartdata', methods=['GET'])
@jwt_required()
def get_chart_data():
    current_user = get_jwt_identity()
    print(current_user)
    cursor, conn = get_cursor()
# chart:1 monthly Expense line graph
    query1=f"SELECT b.month AS expense_month, SUM(e.amount) AS total_expense FROM expense e inner join budget b on b.id=e.budget_id WHERE e.user_id = (SELECT id FROM users WHERE username = %s) GROUP BY expense_month ORDER BY expense_month;"
    cursor.execute(query1,(current_user,))
    data1=cursor.fetchall()
    month_list = [entry.get("expense_month", 0) for entry in data1]
    month_list = map_month_numbers_to_names(month_list)
    expense_list = [entry.get("total_expense", 0) for entry in data1]
    chartdata1 = {
    "labels": month_list,
    "datasets": [
        {
            "label": "Budget",
            "data": expense_list,
            "backgroundColor": [
                "#050A30",
                "#000C66",
                "#0000FF",
                "#7EC8E3",
                "#0E86D4",
                "#055C9D",
            ], }, ],}

    query5 = f"SELECT month as expense_month, SUM(amount) AS total_expense FROM budget WHERE user_id = (SELECT id FROM users WHERE username = %s) GROUP BY expense_month ORDER BY expense_month;"
    cursor.execute(query5, (current_user,))
    data5 = cursor.fetchall()
    month_list = [entry.get("expense_month", 0) for entry in data5]
    month_list = map_month_numbers_to_names(month_list)
    Budget_list = [entry.get("total_expense", 0) for entry in data5]
    chartdata5 = {
        "labels": month_list,
        "datasets": [
            {
                "label": "Budget",
                "data": Budget_list,
                "backgroundColor": [
                    "#050A30",
                    "#000C66",
                    "#0000FF",
                    "#7EC8E3",
                    "#0E86D4",
                    "#055C9D",

                ], }, ], }


#chart2 expense Vs Budget
    query2='''SELECT
    b.criterion AS category,
    MAX(b.amount) AS max_budget_amount,
    SUM(e.amount) / MAX(b.amount) * 100 AS total_expense,
    ((MAX(b.amount) - COALESCE(SUM(e.amount), 0)) / MAX(b.amount)) * 100 AS balance
FROM
    budget b
    LEFT JOIN expense e ON b.user_id = e.user_id AND b.id = e.budget_id
WHERE
    b.user_id = (SELECT id FROM users WHERE username = %s) AND b.month = MONTH(CURDATE())
GROUP BY
    b.criterion;
 '''
    cursor.execute(query2,(current_user,))
    data2 = cursor.fetchall()

    balance_list = [entry.get("balance", 0) for entry in data2]
    expense_list = [entry.get("total_expense", 0) for entry in data2]
    category_list = [entry.get("category", "") for entry in data2]
    chartdata2 = {
        "data": {
            "labels": category_list,
            "datasets": [
                {
                    "label": "Expense %",
                    "data": expense_list,
                    "backgroundColor": "#055C9D",
                },
                {
                    "label": "Balance %",
                    "data": balance_list,
                    "backgroundColor": "#7EC8E3",
                },

            ],
        },
        "options": {
            "plugins": {
                "title": {
                    "display": True,
                    "text": "Chart.js Bar Chart - Stacked",
                },
            },
            "responsive": True,
            "scales": {
                "x": {
                    "stacked": True,
                },
                "y": {
                    "stacked": True,
                },
            },
        },
    }

    # Print or use the chart_data dictionary as needed

    # chart3 total budget
    query3=f'select criterion as category, amount, month from budget where user_id=(SELECT id FROM users WHERE username = %s) and month = MONTH(CURDATE());'
    cursor.execute(query3,(current_user,))
    data3 = cursor.fetchall()
    category_list=[entry.get("category", "") for entry in data3]
    budget_list=[entry.get("amount", "") for entry in data3]
    chartdata3 = {
        "labels": category_list,
        "datasets": [
            {
                "label": "Budget",
                "data": budget_list,
                "backgroundColor": [
                    "#050A30",
                    "#000C66",
                    "#0000FF",
                    "#7EC8E3",
                    "#0E86D4",
                    "#055C9D",
                ],
            },
        ],
    }
# chart4 total expense
    query4=f'select b.criterion as category, SUM(e.amount) as total_expense from expense e left join budget b ON b.id = e.budget_id where e.user_id=(SELECT id FROM users WHERE username = %s) and b.month= Month(curdate()) GROUP BY category;'
    cursor.execute(query4,(current_user,))
    data4 = cursor.fetchall()
    category_list = [entry.get("category", "") for entry in data4]
    expense_list = [entry.get("total_expense", "") for entry in data4]
    chartdata4 = {
        "labels": category_list,
        "datasets": [
            {
                "label": "Budget",
                "data": expense_list,
                "backgroundColor": [
                    "#050A30",
                    "#000C66",
                    "#0000FF",
                    "#7EC8E3",
                    "#0E86D4",
                    "#055C9D",
                ],
            },
        ],
    }

    query6='''SELECT
    DATE(e.date) AS expense_date,
    SUM(e.amount) AS total_expense
FROM
    expense e
    INNER JOIN budget b ON e.budget_id = b.id
WHERE
    e.user_id = (SELECT id FROM users WHERE username = %s)
    AND MONTH(e.date) = MONTH(CURDATE())
    AND YEAR(e.date) = YEAR(CURDATE())
GROUP BY
    DATE(e.date)
ORDER BY
    DATE(e.date);'''
    cursor.execute(query6, (current_user,))
    data6 = cursor.fetchall()
    date_list = [entry.get("expense_date", "") for entry in data6]
    expense_list = [entry.get("total_expense", "") for entry in data6]
    chartdata6 = {
        "labels": date_list,
        "datasets": [
            {
                "label": "Budget",
                "data": expense_list,
                "backgroundColor": [
                    "#050A30",
                    "#000C66",
                    "#0000FF",
                    "#7EC8E3",
                    "#0E86D4",
                    "#055C9D",
                ], }, ], }


    # print(data1)
    # print(data2)
    # print(data3)
    print(data6)

    return jsonify({"chardata1":chartdata1,"chardata2":chartdata2,"chardata3":chartdata3,"chardata4":chartdata4,"chardata5":chartdata5,"chardata6":chartdata6})

# chart5

# const chartData = {
#     labels: ["January", "February", "March", "April", "May"],
#     datasets: [
#         {
#             label: "Budeget",
#             data: [65, 59, 80, 81, 56],
#             backgroundColor: [
#                 "#050A30",
#                 "#000C66",
#                 "#0000FF",
#                 "#7EC8E3",
#                 "#0E86D4",
#                 "#055C9D",
#             ],
#         },
#     ],
# };
#
@app.route('/api/budget', methods=['POST'])
@jwt_required()
def set_budget():
    current_user = get_jwt_identity()
    data = request.get_json()
    print(data)

    for item in data:
        cursor, conn = get_cursor()
        cursor.execute("INSERT INTO budget (user_id, criterion, amount, month) VALUES ((SELECT id FROM users WHERE username = %s), %s, %s, %s) ON DUPLICATE KEY UPDATE amount = %s;",
                       (current_user, item.get('criterion'),  item.get('amount'),item.get('month'),item.get('amount')))
        conn.commit()

    return jsonify({'message': 'Budget set successfully'})


@app.route('/api/expense', methods=['GET'])
@jwt_required()
def get_expenses():
    current_user = get_jwt_identity()
    cursor, conn = get_cursor()
    cursor.execute(
        "SELECT expense.*, budget.criterion as Category FROM expense INNER JOIN budget ON expense.budget_id = budget.id WHERE expense.user_id = (SELECT id FROM users WHERE username = %s)", (current_user,))
    expenses = cursor.fetchall()
    return jsonify({'expenses': expenses})


@app.route('/api/expense', methods=['POST'])
@jwt_required()
def add_expense():
    current_user = get_jwt_identity()
    data = request.get_json()
    data=data[0]
    description = data.get('description')
    amount = data.get('amount')
    budget_id =data.get('budget_id')
    todays_date = date.today()
    cursor, conn = get_cursor()
    cursor.execute("INSERT INTO `MyBudget`.`expense`(`user_id`,`budget_id`,`description`,`amount`,`date`) VALUES((SELECT id FROM users WHERE username = %s),%s,%s,%s,(select now()));",
                   (current_user,budget_id, description, amount))
    conn.commit()

    return jsonify({'message': 'Expense added successfully'})




if __name__ == '__main__':
    app.run(port=5000)

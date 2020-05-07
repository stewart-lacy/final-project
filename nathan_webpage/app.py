from flask import Flask, redirect,url_for,render_template
from flask_bootstrap import Bootstrap
from subprocess import Popen
# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
Bootstrap(app)
 

# 3. Define what to do when a user hits the index route
@app.route('/index.html')
@app.route('/')
def home():
    return render_template("index.html")

@app.route('/data.html')
def data():
    return render_template("data.html")

@app.route('/model_player.html')
def model_player():
    return render_template("model_player.html")

@app.route('/model_position.html')
def model_position():
    return render_template("model_position.html")

@app.route('/model_position.html')
def model():
    return render_template("model.html")

@app.route('/method')
def method():
    return render_template("method.html")


# 4. Define what to do when a user hits the /about route
##@app.route("/about")
##def about():
  ####return "Welcome to my 'About' page!"


if __name__ == "__main__":
    p = Popen(['python3 -m http.server'], shell=True)
    app.run(host='localhost', port=5000)
app.run(debug=True)
import numpy as np
import pickle
from flask import Flask, redirect,url_for,render_template, request,jsonify 
from flask_bootstrap import Bootstrap
from subprocess import Popen
# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
Bootstrap(app)
model_open = pickle.load(open('model.pkl','rb'))
 

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
 
@app.route('/model_position.html',methods = ['POST'])
def model():
    int_features = [int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)

    output = round(prediction[0],2)
    return render_template("model_position.html", prediction_text = 'Shot was made {}').format(output)

if __name__ == "__main__":
    p = Popen(['python3 -m http.server'], shell=True)
    app.run(host='localhost', port=5000)
app.run(debug=True)



from flask import Flask, render_template, request

app = Flask(__name__)

state_a = 0
state_b = 0
state_song = 0
score_a = 5000
score_b = 5000


@app.route('/a')
def xa():
    return render_template('quiz_a.html')

@app.route('/b')
def xb():
    return render_template('quiz_b.html')
    
    
    
    
    
@app.route('/rb')
def rb():
    global state_b
    return render_template('wb.html', b = state_b)
    
@app.route('/ra')
def ra():
    global state_a
    return render_template('wa.html', a = state_a)
    
@app.route('/wb')
def wb():
    global state_b
    state_b = request.args.get('s')
    return render_template('wb.html', b = state_b)

@app.route('/wa')
def wa():
    global state_a
    state_a = request.args.get('s')
    return render_template('wa.html', a = state_a)
    
    
    
    
    
@app.route('/rsong')
def rsong():
    global state_song
    return render_template('wsong.html', song = state_song)
    
@app.route('/wsong')
def wsong():
    global state_song
    state_song = request.args.get('s')
    return render_template('wsong.html', song = state_song)
    
    
    
    
    
@app.route('/rscorea')
def rscorea():
    global score_a
    return render_template('wscorea.html', scorea = score_a)
    
@app.route('/rscoreb')
def rscoreb():
    global score_b
    return render_template('wscoreb.html', scoreb = score_b)    
    
@app.route('/wscorea')
def wscorea():
    global score_a
    score_a = request.args.get('s')
    return render_template('wscorea.html', scorea = score_a)
    
    
@app.route('/wscoreb')
def wscoreb():
    global score_b
    score_b = request.args.get('s')
    return render_template('wscoreb.html', scoreb = score_b)
    
    
################################### überflüssig
@app.route('/xaa')
def xaa():
    global state_a, state_b
    state_a = request.args.get('s')
    print(state_a, state_b)
    return render_template('quiz_a.html', a = state_a, b = state_b)

@app.route('/xbb')
def xbb():
    global state_a, state_b
    state_b = request.args.get('s')
    print(state_a, state_b)
    return render_template('quiz_b.html', a = state_a, b = state_b)
#################################   bis hier überflüssig

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

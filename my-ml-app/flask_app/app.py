import joblib
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load your models
knn_model = joblib.load('flask_app/knn_model.pkl')
dt_model = joblib.load('flask_app/dt_model.pkl')
rf_model = joblib.load('flask_app/rf_model.pkl')

@app.route('/api/predict/<model>', methods=['POST'])
def predict(model):
    try:
        data = request.json
        features = data.get('features')
        
        # Ensure features are in the expected format
        if model == 'knn':
            prediction = knn_model.predict([features])
        elif model == 'dt':
            prediction = dt_model.predict([features])
        elif model == 'rf':
            prediction = rf_model.predict([features])
        else:
            return jsonify({'prediction': 'Error: Model not found'})

        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'prediction': 'Error occurred', 'details': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

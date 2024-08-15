import joblib
import numpy as np

# Load the models
knn_model = joblib.load('knn_model.pkl')
dt_model = joblib.load('dt_model.pkl')
rf_model = joblib.load('rf_model.pkl')

def handler(request):
    model_type = request.path.split('/')[-1]
    body = request.json()
    features = np.array([body['features']])

    if model_type == 'knn':
        prediction = knn_model.predict(features)[0]
    elif model_type == 'dt':
        prediction = dt_model.predict(features)[0]
    elif model_type == 'rf':
        prediction = rf_model.predict(features)[0]
    else:
        return {"error": "Invalid model type"}

    return {"prediction": prediction}

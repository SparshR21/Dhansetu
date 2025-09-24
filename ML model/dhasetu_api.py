from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
from pyngrok import ngrok  # Only needed if using ngrok to expose locally

# Initialize FastAPI app
app = FastAPI(title="Dhansetu Investment API")

# Enable CORS for public API usage
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model, encoders, and scaler
try:
    model_path = r"C:\Users\rspar\Documents\Sparsh\React Native\ML model\investment_classifier_updated.pkl"
    le_path = r"C:\Users\rspar\Documents\Sparsh\React Native\ML model\label_encoders_updated.pkl"
    scaler_path = r"C:\Users\rspar\Documents\Sparsh\React Native\ML model\scaler_updated.pkl"

    model = joblib.load(model_path)
    label_encoders = joblib.load(le_path)
    scaler = joblib.load(scaler_path)
except Exception as e:
    raise RuntimeError(f"Error loading model or files: {e}")

# Input schema
class InvestmentInput(BaseModel):
    Age: int
    Occupation: str
    Risk_Tolerance: str
    Investment_Duration: str
    Financial_Goals: str
    Investment_Amount: float
    Liquidity_Needs: str
    Annual_Income: float

# Encode helper
def encode_input(col_name, value):
    try:
        return label_encoders[col_name].transform([value])[0]
    except Exception:
        return -1  # Unknown category fallback

# Root endpoint
@app.get("/")
def root():
    return {"message": "Dhansetu Investment API is running!"}

# Prediction endpoint
@app.post("/predict")
def predict(input_data: InvestmentInput):
    try:
        # Convert input to dict and align key names to match training
        data = input_data.model_dump()
        print("✅ Received data from frontend:", data)


        # Correct the column names to match training data
        aligned_data = {
            "Age": data["Age"],
            "Occupation": data["Occupation"],
            "Risk Tolerance": data["Risk_Tolerance"],  # Ensure the space here
            "Investment Duration": data["Investment_Duration"],  # Space is important here
            "Financial Goals": data["Financial_Goals"],  # Space is important here
            "Investment Amount": data["Investment_Amount"],  # Space is important here
            "Liquidity Needs": data["Liquidity_Needs"],  # Space is important here
            "Annual Income": data["Annual_Income"]  # Space is important here
        }

        # Prepare the data for prediction
        model_columns = [
            "Age", "Occupation", "Risk Tolerance", "Investment Duration",
            "Financial Goals", "Investment Amount", "Liquidity Needs", "Annual Income"
        ]

        df = pd.DataFrame([[aligned_data[col] for col in model_columns]], columns=model_columns)

        # Encode categorical features
        categorical_cols = ["Occupation", "Risk Tolerance", "Investment Duration", "Financial Goals", "Liquidity Needs"]
        for col in categorical_cols:
            df[col] = encode_input(col, df[col].values[0])

        # Scale numerical features
        numeric_cols = ["Age", "Investment Amount", "Annual Income"]
        df = pd.DataFrame(scaler.transform(df), columns=df.columns)


        expected_features = model.get_booster().feature_names
        if expected_features:
            df = df[expected_features]


        # Make prediction
        prediction = model.predict(df)

        # Decode the recommendation
        recommendation = label_encoders["Investment Recommendation"].inverse_transform(prediction)

        return {"investment_recommendation": recommendation[0]}

    except Exception as e:
        import traceback
        traceback.print_exc()  # 👈 print full error in console
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")


# Optional: Launch with ngrok for public testing
if __name__ == "__main__":
    public_url = ngrok.connect(8000)
    print(f" * Ngrok tunnel: {public_url} -> http://127.0.0.1:8000")

    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)

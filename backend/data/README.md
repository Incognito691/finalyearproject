# Dummy Data for ML Training

This directory contains realistic scam report data for training and testing the ML model.

## Dataset Overview

- **Total Reports**: 80+ diverse scam reports
- **Categories**: All 6 scam types covered
- **Languages**: Mix of English and Nepali (Romanized)
- **Scam Probability Range**: 0.05 - 0.98 (realistic distribution)

## Category Breakdown

### 1. OTP Theft Attempt (18 reports)

- Probability: 0.85 - 0.94 (HIGH)
- Patterns: OTP requests, verification codes, "share immediately"
- Keywords: OTP, code, verify, unlock, blocked

### 2. eSewa/Khalti Wallet Scam (14 reports)

- Probability: 0.83 - 0.94 (HIGH)
- Patterns: Wallet locked, unauthorized transaction, refund claims
- Keywords: eSewa, Khalti, IME Pay, wallet, credit, refund

### 3. Impersonation (Bank) (18 reports)

- Probability: 0.79 - 0.97 (MEDIUM to HIGH)
- Patterns: Bank security alerts, KYC updates, card blocks
- Keywords: bank names, ATM, PIN, card, account suspended

### 4. Prize/Reward Fraud (16 reports)

- Probability: 0.83 - 0.98 (HIGH)
- Patterns: Lottery winners, free prizes, processing fees
- Keywords: congratulations, winner, lottery, prize, fee

### 5. Fake Job Offer (14 reports)

- Probability: 0.81 - 0.96 (HIGH)
- Patterns: Foreign jobs, government positions, upfront fees
- Keywords: job, visa, Dubai, Qatar, salary, fee

### 6. Other (10 reports)

- Probability: 0.05 - 0.79 (LOW to MEDIUM)
- Mix of legitimate messages and user warnings
- Includes victim self-reports ("hacked", "not me")

## Special Number Patterns

### SIM Swap Simulation Numbers

These numbers have clustered reports in last 48 hours:

- **9801234567**: 3 reports (OTP + wallet scam)
- **9812345678**: 3 reports (bank impersonation + OTP)
- **9801111111**: 2 reports (OTP + wallet)
- **9816666666**: 2 reports (wallet + victim self-report)

This creates realistic anomaly patterns for detection.

## Key Features for ML Training

### 1. Scam Indicators

- **High-risk keywords**: OTP, password, PIN, urgent, blocked, verify
- **Urgency language**: immediately, within X minutes, limited time
- **Authority impersonation**: bank names, government, telecom
- **Financial requests**: processing fee, registration charge

### 2. Legitimate Patterns

- Transactional confirmations (low probability)
- Meeting reminders (low probability)
- Official OTP messages with disclaimers (low probability)

### 3. Language Mix

- English: Formal scam attempts
- Nepali (Romanized): Local scam variants
- Code-switching: Common in Nepal

### 4. Behavioral Patterns

- **Victim self-reports**: Messages containing "hacked", "not me", "unauthorized"
- **Warning reports**: Community members alerting others
- **Multi-category attacks**: Same number across different scam types

## Loading the Data

### Option 1: Using the Script (Recommended)

```bash
cd backend
python scripts/load_dummy_data.py
```

This will:

- Load all 80+ reports into MongoDB
- Distribute timestamps realistically (last 7 days)
- Create SIM swap patterns (clustered reports)
- Show summary statistics

### Option 2: Manual API Calls

Use the `/reports` endpoint to submit each report individually.

## Expected ML Training Outcomes

After training on this dataset, the model should recognize:

1. **High-Risk Patterns** (>80% probability)

   - OTP theft language
   - Urgency + financial request
   - Impersonation + credential request

2. **Medium-Risk Patterns** (40-80% probability)

   - Prize claims with fees
   - Job offers with upfront payment
   - Unverified bank communications

3. **Low-Risk Patterns** (<40% probability)
   - Transactional confirmations
   - Legitimate appointment reminders
   - Official disclaimers

## Anomaly Detection Patterns

The dataset includes patterns to trigger anomaly flags:

- **SPIKE**: 3+ reports in 1 hour (simulated on specific numbers)
- **BURST**: 5+ reports in 1 hour (for high-risk numbers)
- **REPEATED_MESSAGE**: Similar message variations
- **RECENT_SURGE**: 4+ reports in 48 hours (SIM swap indicator)

## Future Enhancements

To improve the dataset:

- [ ] Add more Nepali/Devanagari script messages
- [ ] Include seasonal scam variations (Dashain, Tihar)
- [ ] Add regional dialect variations
- [ ] Include newer scam types (crypto, NFT)
- [ ] More edge cases and adversarial examples

## Data Privacy

This is **synthetic data** created for training purposes. No real phone numbers, personal information, or actual scam messages from victims are included.

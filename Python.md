```python
import csv
from decimal import Decimal
import matplotlib.pyplot as plt

#DECLARES ARRAYS TO STORE THE DATA FROM THE CSV FILE

Gas = [];
Diesel = [];
Load = [];
FuelType = [];


WaterPumpA = [];
WaterPumpB = [];
WaterPumpC = [];
WaterPumpD = [];
WaterPumpE = [];

SeawaterLiftA = [];
SeawaterLiftB = [];
SeawaterLiftC = [];

CompressorA = [];
CompressorB = [];


#THESE TIME ARRAYS ARE TO RETRIEVE JUST THE HOURS OF THE DAY NOT THE ENTIRE TIMESTAMP

Time = [];
AlmostTime = [];
ActualTime = [];
index = 0;

#OPENS AND READS THE CSV FILE LINE BY LINE
with open('GP.csv', newline='',encoding='utf-8-sig') as csvfile:
    Full = csv.reader(csvfile, delimiter=' ', quotechar='|',)
    next(Full);
    
    #GOES THROUGH EACH ITEM PER ROW, HENCE THE NESTED LOOP
    for row in Full:
        for item in row:
            #print(item);
            
            #TAKES THE ITEMS IN THE ROWS BY COLUMN AND INPUTS THEM INTO THEIR ARRAY
            Time.append(item.split(',', 17)[0]);
            Gas.append(item.split(',', 17)[1]);
            Diesel.append(item.split(',', 17)[2]);
            Load.append(item.split(',', 17)[3]);
            
            WaterPumpA.append(item.split(',', 17)[5]);
            WaterPumpB.append(item.split(',', 17)[6]);
            WaterPumpC.append(item.split(',', 17)[7]);
            WaterPumpD.append(item.split(',', 17)[8]);
            WaterPumpE.append(item.split(',', 17)[9]);
            
            SeawaterLiftA.append(item.split(',', 17)[11]);
            SeawaterLiftB.append(item.split(',', 17)[12]);
            SeawaterLiftC.append(item.split(',', 17)[13]);

            CompressorA.append(item.split(',', 17)[15]);
            CompressorA.append(item.split(',', 17)[16]);
      
            
    #REMOVING THE DAY PART OF THE TIMESTAMP
    for timestamp in Time:
        AlmostTime.append(timestamp.split('T', 1)[1]);
        
    for timestamp in AlmostTime:
        ActualTime.append(timestamp.split('Z', 1)[0]);
        
        
    #print(ActualTime);
    
    #TO KEEP TRACK OF INDICES WITH ERRONEOUS DATA
    faultyIndices = [];
    
    
    #MAKES AN ARRAY THAT HAS THE TONNES OF GAS
    TonnesOfGasPerHour = [];
    TOGPHIndex = 0;
    for i in Gas:
        #print(type(i));
        try:
            temp = float(i);
        except ValueError:
            print(temp);
            faultyIndices.append(TOGPHIndex);
        #print(type(temp));
        
        #temp = float(i);
        TonnesOfGasPerHour.append(round((temp*0.001),7));
        TOGPHIndex = TOGPHIndex+1;
        
    
    EmissionsFromGas = [];
    EMGIndex = 0;
    for i in TonnesOfGasPerHour:
        #print(i);
        #EmissionsFromGas[EMGIndex] = (i*2.656159);
        EmissionsFromGas.append(round((i*2.656159),10));
        EMGIndex = EMGIndex+1;
    
               
        
HOURS = 24;

numberOfValuesRecordedForEmissionsFromGas = len(EmissionsFromGas);
numberOfValuesRecordedFromEmissionsFromGasPerHour = (numberOfValuesRecordedForEmissionsFromGas/HOURS);
        
print("The number of individual entries recorded for Gas over 24 hours: ", numberOfValuesRecordedForEmissionsFromGas, "\n");
print("The number of individual entries for Gas PER HOUR: ", numberOfValuesRecordedFromEmissionsFromGasPerHour, "\n");


emissionsEachHour = [];
multiple = 1;


for i in range(HOURS):

    hoursEmissions = EmissionsFromGas[round((i*numberOfValuesRecordedFromEmissionsFromGasPerHour)):round((multiple*numberOfValuesRecordedFromEmissionsFromGasPerHour))];
    multiple = multiple + 1;
    #print(hoursEmissions);
        
    AverageOfHour = sum(hoursEmissions)/len(hoursEmissions);
    emissionsEachHour.append(AverageOfHour);
    #print(emissionsEachHour);


print("The AVERAGE emission per hour is, ")
for i in emissionsEachHour:
    print(i, "tonnes/hour");
print("\n\n\n");

figure = plt.figure();

plt.figure(1);
plt.subplot(111);
plt.plot(range(HOURS),emissionsEachHour);   #GRAPH PLOT!!!!!!!!!!!!!!
plt.ylabel("Average CO2 Emissions Per Hour");
plt.xlabel("Hour of the Day");


#firsthour = EmissionsFromGas[0:round(numberOfValuesRecordedFromEmissionsFromGasPerHour)];
#secondhour = EmissionsFromGas[round(numberOfValuesRecordedFromEmissionsFromGasPerHour):];

#AverageEmissionsOfFirstHour = sum(firsthour)/len(firsthour);
#AverageEmissionsOfSecondHour = sum(secondhour)/len(secondhour);


#print("The average emissions over the first hour: ", AverageEmissionsOfFirstHour, " tonnes/hr");
#print("The average emissions over the second hour: ", AverageEmissionsOfSecondHour, " tonnes/hr");











    
    #for i in EmissionsFromGas:
        #print(i);
    
    
    
    
    

        #print(', '.join(row))
    #unsplit = list(GasRatesWithTime);
    
    #for i in unsplit:
        #print(i);
    
    #for row in unsplit:
        #Gas.append(row.split(',')[0]);
        #Gas.append(unsplit.split(',')[0]);
        #[row.split(',', 1)[0] for row in GasRatesWithTime]
        
        
        
        
    
    
    #Check which machines are online, If ALL values are zero
    #If machine is online, then we work out average % per hour
    #We need to print it in kWh
    #Is it Gas or Diesel? Reference the Fuel Type column
    #
    
    
def checkIfOnline(machine):
    anyNonZero = 0;
    for x in machine:
        if(x != "0" and x != "") :
            #print(x);
            anyNonZero = 1;

    if(bool(anyNonZero)) :
        return 1;
    else :  
        return 0;
    
    
#print(checkIfOnline(Gas));
#print(checkIfOnline(Diesel));
    
    
def convertDataFromStringToFloat(machine):
    floats = [];
    for i in machine:
        
        if(i == ""):
            try:
                floats.append(0.00);
            except ValueError:
                print(i);
        else:
            try:
                floats.append(float(i));
            except ValueError:
                print(i);
    
            
    #floats = [float(i) for i in machine];
    return floats;


    
def hourlyFLCPercentage(machine):
    numberOfEntries = len(machine);
    
    numberOfEntriesPerHour = numberOfEntries/HOURS;
    
    entriesAveragePerHour = [];
    
    multiple = 1;
    
    for i in range(HOURS):
        hourWorthOfData = machine[round((i*numberOfEntriesPerHour)):round((multiple*numberOfEntriesPerHour))];
        multiple = multiple+1;
        #print(type(hourWorthOfData));
        #print(hourWorthOfData);
        
        #print(type(sum(hourWorthOfData)));
        #print(type(len(hourWorthOfData)));
        
        average = sum(hourWorthOfData)/len(hourWorthOfData);
        #print(type(average));

        #print(average);

        entriesAveragePerHour.append(average);
        
    return entriesAveragePerHour;


#print(checkIfOnline(WaterPumpA));

#def hourlyFLCPercentage(machine) :
   # decimals = hourlyFLCDecimal(machine);
   # percent = [];
   # for x in decimals:
    #    percent.append(round((x*100),4));
   # return percent;


def PowerConsumptionBasedOnFLCPerHour(machine, capacity):
    powerConsumptionPerHour = [];
    
    for i in hourlyFLCPercentage(machine):
        powerConsumptionPerHour.append(i*capacity); #kW
    
    return powerConsumptionPerHour;

#THIS IS AN EXAMPLE BASED ON THE DATA TAKEN FROM YESTERDAY'S 24 HOURS



def printTable(data):
    dash = '-' * 40

    for i in range(len(data)):
    #if i == 0:
        
        print('{:<10f}'.format(data[i]));



figureToUse = 2;

if(checkIfOnline(WaterPumpA)):
    WaterPumpA = convertDataFromStringToFloat(WaterPumpA);
    print("The Hourly FLC % for Water Pump A: ", hourlyFLCPercentage(WaterPumpA), "kW \n");
    print("The Power consumption from Water Pump A is: ", (PowerConsumptionBasedOnFLCPerHour(WaterPumpA,4900)), "kW \n");
    #printTable((PowerConsumptionBasedOnFLCPerHour(WaterPumpA,4900)));
    plt.figure(figureToUse);
    plt.subplot(111);
    plt.plot(PowerConsumptionBasedOnFLCPerHour(WaterPumpA,4900));   #GRAPH PLOT!!!!!!!!!!!!!!
    plt.ylabel("Power Consumption of The Water Pump Per Hour");
    plt.xlabel("Hour of the Day");
    figureToUse = figureToUse+1;

    
    
if(checkIfOnline(WaterPumpB)):
    WaterPumpB = convertDataFromStringToFloat(WaterPumpB);
    print("The Hourly FLC % for Water Pump B: ", hourlyFLCPercentage(WaterPumpB), "\n");
    print("The Power consumption from Water Pump B is: ", PowerConsumptionBasedOnFLCPerHour(WaterPumpB,4900), "kW \n");
    plt.figure(figureToUse);
    plt.subplot(111);
    plt.plot(PowerConsumptionBasedOnFLCPerHour(WaterPumpB,4900));   #GRAPH PLOT!!!!!!!!!!!!!!
    plt.ylabel("Power Consumption of The Water Pump Per Hour");
    plt.xlabel("Hour of the Day");
    figureToUse = figureToUse+1;


if(checkIfOnline(WaterPumpC)):
    WaterPumpC = convertDataFromStringToFloat(WaterPumpC);
    print("The Hourly FLC % for Water Pump C: ", hourlyFLCPercentage(WaterPumpC), "\n");
    print("The Power consumption from Water Pump C is: ", PowerConsumptionBasedOnFLCPerHour(WaterPumpC,4900), "kW \n");
    plt.figure(figureToUse);
    plt.subplot(111);
    plt.plot(PowerConsumptionBasedOnFLCPerHour(WaterPumpC,4900));   #GRAPH PLOT!!!!!!!!!!!!!!
    plt.ylabel("Power Consumption of The Water Pump Per Hour");
    plt.xlabel("Hour of the Day");
    figureToUse = figureToUse+1;


if(checkIfOnline(WaterPumpD)):
    WaterPumpD = convertDataFromStringToFloat(WaterPumpD);
    print("The Hourly FLC % for Water Pump D: ", hourlyFLCPercentage(WaterPumpD), "kW \n");
    print("The Power consumption from Water Pump D is: ", PowerConsumptionBasedOnFLCPerHour(WaterPumpD,4900), "\n");
    plt.figure(figureToUse);
    plt.subplot(111);
    plt.plot(convertDataFromStringToFloat(WaterPumpD,4900));   #GRAPH PLOT!!!!!!!!!!!!!!
    plt.ylabel("Power Consumption of The Water Pump Per Hour");
    plt.xlabel("Hour of the Day");
    figureToUse = figureToUse+1;

    
if(checkIfOnline(WaterPumpE)):
    WaterPumpE = convertDataFromStringToFloat(WaterPumpE);
    print("The Hourly FLC % for Water Pump E: ", hourlyFLCPercentage(WaterPumpE), "kW \n");
    print("The Power consumption from Water Pump E is: ", PowerConsumptionBasedOnFLCPerHour(WaterPumpE,4900), "\n");
    plt.figure(figureToUse);
    plt.subplot(111);
    plt.plot(PowerConsumptionBasedOnFLCPerHour(WaterPumpE,4900));   #GRAPH PLOT!!!!!!!!!!!!!!
    plt.ylabel("Power Consumption of The Water Pump Per Hour");
    plt.xlabel("Hour of the Day");
    figureToUse = figureToUse+1;

    

powerConsumptionByAllActiveMachines = [];

powerConsumptionByAllActiveMachines.append(PowerConsumptionBasedOnFLCPerHour(WaterPumpA,4900));
powerConsumptionByAllActiveMachines.append(PowerConsumptionBasedOnFLCPerHour(WaterPumpB,4900));
powerConsumptionByAllActiveMachines.append(PowerConsumptionBasedOnFLCPerHour(WaterPumpD,4900));

#for j in range(len(powerConsumptionByAllActiveMachines)):
    #for i in range(HOURS):
        #print(powerConsumptionByAllActiveMachines[j][i]);
        
rawRatios = [];
        
for i in range(HOURS):
    
    #index = 0;
    powerConsumptionAtCertainHour = [];
    for j in range(len(powerConsumptionByAllActiveMachines)):
        powerConsumptionAtCertainHour.append(powerConsumptionByAllActiveMachines[j][i]);
        #print(powerConsumptionAtCertainHour);
        
    summation = sum(powerConsumptionAtCertainHour);
    ratios = [];
    for k in range(len(powerConsumptionAtCertainHour)):
        if(all(values == 0 for values in powerConsumptionAtCertainHour)):
            zeros = [];
            
            #for l in range(len(powerConsumptionAtCertainHour)):
            #zeros.append(0);
            ratios.append(0.0);
        else:    
            ratioOfCurrentMachine = (powerConsumptionAtCertainHour[k]/summation);
            ratios.append(ratioOfCurrentMachine);
    rawRatios.append(ratios);
    
    
print("\n\nThe raw Ratios are: ", rawRatios, "\n");

CO2Ratios = [];

#print(len(rawRatios));

for a in range(HOURS):
    #TAKES THE RAW RATIOS AND MULTIPLIES THEM BY THE CO2 EMISSIONS AT THAT POINT IN TIME
    CO2RatioAtCertainHour = [];
    rawRatioAtCertainHour = rawRatios[a];
    
    #print(rawRatioAtCertainHour);
    CO2RatioAtCertainHourPerRatio = [];

    for b in range(len(rawRatios[0])):
        #print(b);

        CO2PreCalculatedRatio = rawRatioAtCertainHour[b]
        #print(CO2PreCalculatedRatio);
        #print(emissionsEachHour[a]);
        #print(type(CO2PreCalculatedRatio));
        #print(type(emissionsEachHour[b]));
        #print(type());

        CO2CalculatedRatio = (CO2PreCalculatedRatio*emissionsEachHour[a]);
        CO2RatioAtCertainHourPerRatio.append(CO2CalculatedRatio);
        #print(CO2RatioAtCertainHourPerRatio);
    #CO2RatioAtCertainHour.append(CO2RatioAtCertainHourPerRatio);
    #print(CO2RatioAtCertainHour);
    #CO2Ratios.append(CO2RatioAtCertainHour);
    CO2Ratios.append(CO2RatioAtCertainHourPerRatio);
    
    
print("Example for the first Hour of the day:\n");
print("These is the CO2 ratio for the first hour of the day across Water Pump A, B and D: ", CO2Ratios[0], "\n");
labels = ["Water Pump A", "Water Pump B", "Water Pump D"];
sizes = CO2Ratios[0];
#indexToExplode = 0;
#maximumValueIndex = index(max(CO2RatioAtCertainHour[0]));

#indexAt = 0;
#for x in CO2RatioAtCertainHour[0]:
#    if(indexAt == maximumValueIndex)
    
explode = (0,0,0);

plt.figure(figureToUse);
plt.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
        shadow=True, startangle=90);
plt.axis('equal');
figureToUse = figureToUse+1;


sizes = CO2Ratios[1];
plt.figure(figureToUse);
plt.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
        shadow=True, startangle=90);
plt.axis('equal');
figureToUse = figureToUse+1;


sizes = CO2Ratios[2];
plt.figure(figureToUse);
plt.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
        shadow=True, startangle=90);
plt.axis('equal');
figureToUse = figureToUse+1;
```

    The number of individual entries recorded for Gas over 24 hours:  3564 
    
    The number of individual entries for Gas PER HOUR:  148.5 
    
    The AVERAGE emission per hour is, 
    13.18253099004932 tonnes/hour
    13.180596856658397 tonnes/hour
    13.16970788827047 tonnes/hour
    13.103561983108106 tonnes/hour
    13.114166572290543 tonnes/hour
    13.12127799861275 tonnes/hour
    13.151337446956376 tonnes/hour
    13.172185914781759 tonnes/hour
    13.147979045635806 tonnes/hour
    13.180759702377184 tonnes/hour
    13.173856042085234 tonnes/hour
    13.171440162253381 tonnes/hour
    13.24004919789392 tonnes/hour
    13.236048881995298 tonnes/hour
    13.237263798427513 tonnes/hour
    13.193559110958784 tonnes/hour
    13.186698126630409 tonnes/hour
    13.174967083091957 tonnes/hour
    13.177322739593292 tonnes/hour
    12.68093119217365 tonnes/hour
    13.766786651237844 tonnes/hour
    13.78316255189329 tonnes/hour
    13.823444183585906 tonnes/hour
    nan tonnes/hour
    
    
    
    
    The Hourly FLC % for Water Pump A:  [98.30157756756758, 98.40378859060404, 79.19418342281884, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] kW 
    
    The Power consumption from Water Pump A is:  [481677.7300810811, 482178.5640939598, 388051.4987718123, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] kW 
    
    The Hourly FLC % for Water Pump B:  [47.33038817567568, 92.20796624161072, 32.93640973154362, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] 
    
    The Power consumption from Water Pump B is:  [231918.90206081083, 451819.0345838925, 161388.40768456375, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] kW 
    
    The Hourly FLC % for Water Pump D:  [87.47518378378388, 87.45058536912762, 87.48378503355714, 87.4737354054055, 87.45368101351362, 87.46386523489943, 87.45722530201353, 87.4804202027028, 87.50715939189199, 87.51698469798669, 87.50370483221485, 87.50715939189199, 87.46705060810821, 87.45722530201351, nan, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] kW 
    
    The Power consumption from Water Pump D is:  [428628.400540541, 428507.86830872536, 428670.54666443, 428621.30348648696, 428523.0369662167, 428572.9396510072, 428540.4039798663, 428654.0589932437, 428785.08102027077, 428833.22502013476, 428768.15367785277, 428785.08102027077, 428588.54797973024, 428540.4039798662, nan, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] 
    
    
    
    The raw Ratios are:  [[0.4217012552683212, 0.20304134073840605, 0.37525740399327284], [0.35389110412920627, 0.33160897004191137, 0.3144999258288823], [0.3967358671341019, 0.1650001870132664, 0.43826394585263173], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [nan, nan, nan], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]] 
    
    Example for the first Hour of the day:
    
    These is the CO2 ratio for the first hour of the day across Water Pump A, B and D:  [5.559089866117343, 2.6765987665452013, 4.946842357386777] 
    



![png](output_0_1.png)



![png](output_0_2.png)



![png](output_0_3.png)



![png](output_0_4.png)



![png](output_0_5.png)



![png](output_0_6.png)



![png](output_0_7.png)



```python

```


```python

```


```python

```

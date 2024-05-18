DROP TABLE IF EXISTS Motorcycle;
CREATE TABLE IF NOT EXISTS Motorcycle (
    id INTEGER PRIMARY KEY,
    brand TEXT,
    type TEXT,
    model TEXT,
    year INTEGER,
    price INTEGER,
    tech_specs INTEGER,
    deductible_data INTEGER,
    images INTEGER,
    FOREIGN KEY (price) REFERENCES Price(id),
    FOREIGN KEY (tech_specs) REFERENCES TechSpecs(id),
    FOREIGN KEY (deductible_data) REFERENCES DeductibleData(id),
    FOREIGN KEY (images) REFERENCES MotorcycleImages(id)
);

DROP TABLE IF EXISTS Price;
CREATE TABLE IF NOT EXISTS Price (
    id INTEGER PRIMARY KEY,
    price REAL,
    currency TEXT,
    iva_included INTEGER
);

DROP TABLE IF EXISTS TechSpecs;
CREATE TABLE IF NOT EXISTS TechSpecs (
    id INTEGER PRIMARY KEY,
    engine INTEGER,
    brakes INTEGER,
    suspension INTEGER,
    wheels INTEGER,
    dimensions INTEGER,
    chassis TEXT,
    transmission INTEGER,
    fuel INTEGER,
    performance INTEGER,
    equipment INTEGER,
    FOREIGN KEY (engine) REFERENCES Engine(id),
    FOREIGN KEY (brakes) REFERENCES Brakes(id),
    FOREIGN KEY (suspension) REFERENCES Suspension(id),
    FOREIGN KEY (wheels) REFERENCES Wheels(id),
    FOREIGN KEY (dimensions) REFERENCES Dimensions(id),
    FOREIGN KEY (transmission) REFERENCES Transmission(id),
    FOREIGN KEY (fuel) REFERENCES Fuel(id),
    FOREIGN KEY (performance) REFERENCES Performance(id),
    FOREIGN KEY (equipment) REFERENCES Equipment(id)
);

DROP TABLE IF EXISTS Engine;
CREATE TABLE IF NOT EXISTS Engine (
    id INTEGER PRIMARY KEY,
    cylinders INTEGER,
    displacement REAL,
    power INTEGER,
    torque INTEGER,
    compression_ratio TEXT,
    cooling TEXT,
    fuel_system TEXT,
    gas_emission TEXT,
    battery TEXT,
    FOREIGN KEY (cylinders) REFERENCES Cylinders(id),
    FOREIGN KEY (power) REFERENCES Power(id),
    FOREIGN KEY (torque) REFERENCES Torque(id)
);

DROP TABLE IF EXISTS Cylinders;
CREATE TABLE IF NOT EXISTS Cylinders (
    id INTEGER PRIMARY KEY,
    number INTEGER,
    layout TEXT
);

DROP TABLE IF EXISTS Power;
CREATE TABLE IF NOT EXISTS Power (
    id INTEGER PRIMARY KEY,
    hp REAL,
    rpm INTEGER
);

DROP TABLE IF EXISTS Torque;
CREATE TABLE IF NOT EXISTS Torque (
    id INTEGER PRIMARY KEY,
    nm REAL,
    rpm INTEGER
);

DROP TABLE IF EXISTS Brakes;
CREATE TABLE IF NOT EXISTS Brakes (
    id INTEGER PRIMARY KEY,
    front INTEGER,
    rear INTEGER,
    anti_lock_braking_system INTEGER,
    FOREIGN KEY (front) REFERENCES BrakeFront(id),
    FOREIGN KEY (rear) REFERENCES BrakeRear(id)
);

DROP TABLE IF EXISTS BrakeFront;
CREATE TABLE IF NOT EXISTS BrakeFront (
    id INTEGER PRIMARY KEY,
    type TEXT,
    diameter TEXT
);

DROP TABLE IF EXISTS BrakeRear;
CREATE TABLE IF NOT EXISTS BrakeRear (
    id INTEGER PRIMARY KEY,
    type TEXT,
    diameter TEXT
);

DROP TABLE IF EXISTS Suspension;
CREATE TABLE IF NOT EXISTS Suspension (
    id INTEGER PRIMARY KEY,
    front TEXT,
    rear TEXT,
    front_travel TEXT,
    rear_travel TEXT
);

DROP TABLE IF EXISTS Dimensions;
CREATE TABLE IF NOT EXISTS Dimensions (
    id INTEGER PRIMARY KEY,
    length TEXT,
    width TEXT,
    height TEXT,
    wheelbase TEXT,
    seat_height TEXT,
    weight TEXT
);

DROP TABLE IF EXISTS Transmission;
CREATE TABLE IF NOT EXISTS Transmission (
    id INTEGER PRIMARY KEY,
    type TEXT,
    gears INTEGER
);

DROP TABLE IF EXISTS Fuel;
CREATE TABLE IF NOT EXISTS Fuel (
    id INTEGER PRIMARY KEY,
    type TEXT,
    approx_consumption TEXT,
    tank TEXT,
    recommended_octane TEXT
);

DROP TABLE IF EXISTS Performance;
CREATE TABLE IF NOT EXISTS Performance (
    id INTEGER PRIMARY KEY,
    top_speed TEXT,
    acceleration_0_to_100 TEXT
);

DROP TABLE IF EXISTS Equipment;
CREATE TABLE IF NOT EXISTS Equipment (
    id INTEGER PRIMARY KEY,
    lights TEXT,
    instrumentation TEXT,
    abs_breaks INTEGER,
    traction_control INTEGER,
    quickshifter INTEGER,
    ride_modes INTEGER,
    cruise_control INTEGER,
    low_rpm_assist INTEGER,
    launch_control INTEGER,
    hill_start_assist INTEGER
);

DROP TABLE IF EXISTS Wheels;
CREATE TABLE IF NOT EXISTS Wheels (
    id INTEGER PRIMARY KEY,
    front INTEGER,
    rear INTEGER,
    FOREIGN KEY (front) REFERENCES Wheel(id),
    FOREIGN KEY (rear) REFERENCES Wheel(id)
);

DROP TABLE IF EXISTS Wheel;
CREATE TABLE IF NOT EXISTS Wheel (
    id INTEGER PRIMARY KEY,
    type TEXT,
    size TEXT
);

DROP TABLE IF EXISTS DeductibleData;
CREATE TABLE IF NOT EXISTS DeductibleData (
    id INTEGER PRIMARY KEY,
    approx_range REAL
);

DROP TABLE IF EXISTS MotorcycleImages;
CREATE TABLE IF NOT EXISTS MotorcycleImages (
    id INTEGER PRIMARY KEY,
    banner TEXT,
    model_3d TEXT,
    view_360 TEXT
);

DROP TABLE IF EXISTS ColorImage;
CREATE TABLE IF NOT EXISTS ColorImage (
    id INTEGER PRIMARY KEY,
    color TEXT,
    image TEXT,
    motorcycle_images INTEGER,
    FOREIGN KEY (motorcycle_images) REFERENCES MotorcycleImages(id)
);

DROP TABLE IF EXISTS VideoSrc;
CREATE TABLE IF NOT EXISTS VideoSrc (
    id INTEGER PRIMARY KEY,
    src TEXT,
    type TEXT,
    motorcycle_images INTEGER,
    FOREIGN KEY (motorcycle_images) REFERENCES MotorcycleImages(id)
);

DROP TABLE IF EXISTS GalleryImage;
CREATE TABLE IF NOT EXISTS GalleryImage (
    id INTEGER PRIMARY KEY,
    image TEXT,
    title TEXT,
    motorcycle_images INTEGER,
    FOREIGN KEY (motorcycle_images) REFERENCES MotorcycleImages(id)
);
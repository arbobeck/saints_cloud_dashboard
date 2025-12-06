\c saintsdb

TRUNCATE TABLE "Saints" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "History" RESTART IDENTITY CASCADE;

-- Insert Saints
INSERT INTO "Saints" ("Name", "FeastDay", "Patronages")
VALUES 
    ('St. Francis of Assisi', '2025-10-04', 'Animals, Ecology'),
    ('St. Augustine', '2025-08-28', 'Theologians'),
    ('St. Teresa of Avila', '2025-10-15', 'Writers, Mystics'),
    ('St. Daria & St. Chrysanthus', '2025-10-25', 'Judges'),
    ('St. Demetrius', '2025-10-26', 'Soldiers, Courage'),
    ('St. Abibus of Edessa', '2025-11-15', 'Contracts, Marriage, Syria'),
    ('St. Barlaam', '2025-11-19', 'Spiritual Converts, Truth Seekers'),
    ('St. Saturninus of Toulouse', '2025-11-29', 'Toulouse');

-- Insert History (Id will auto-increment)
INSERT INTO "History" ("Name", "Year")
VALUES
    ('Pentecost', 33),
    ('Filioque added by Third Council of Toledo', 589),
    ('Cyril and Methodius begin evangelization to the Slavs', 863),
    ('Great Schism', 1054),
    ('Union of Uzhhorod', 1646),
    ('First Ruthenian Catholic Eparchy established by Pope Clement XIV', 1771);
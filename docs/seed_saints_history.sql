USE SaintsDB;
GO

-- Only truncate if tables exist
IF OBJECT_ID('Saints', 'U') IS NOT NULL
BEGIN
    TRUNCATE TABLE Saints;
END

IF OBJECT_ID('History', 'U') IS NOT NULL
BEGIN
    TRUNCATE TABLE History;
END
GO

-- Insert Saints (Id will auto-increment)
INSERT INTO Saints (Name, FeastDay, Patronages)
VALUES 
    ('St. Francis of Assisi', '2025-10-04', 'Animals, Ecology'),
    ('St. Augustine', '2025-08-28', 'Theologians'),
    ('St. Teresa of Avila', '2025-10-15', 'Writers, Mystics'),
    ('St. Daria & St. Chrysanthus', '2025-10-25', 'Judges'),
    ('St. Demetrius', '2025-10-26', 'Soldiers, Courage'),
    ('St. Abibus of Edessa', '2025-11-15', 'Contracts, Marriage, Syria'),
    ('St. Barlaam', '2025-11-19', 'Spiritual Converts, Truth Seekers');
GO

-- Insert History (Id will auto-increment)
INSERT INTO History (Name, Year)
VALUES
    ('Pentecost', 33),
    ('Filioque added by Third Council of Toledo', 589),
    ('Great Schism', 1054),
    ('Union of Uzhhorod', 1646),
    ('First Ruthenian Catholic Eparchy established by Pope Clement XIV', 1771);
GO
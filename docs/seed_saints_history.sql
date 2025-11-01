IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'SaintsDB')
BEGIN
    CREATE DATABASE SaintsDB;
END
GO

USE SaintsDB;
GO

TRUNCATE TABLE Saints;
TRUNCATE TABLE History;
GO

IF OBJECT_ID('Saints', 'U') IS NULL
BEGIN
    CREATE TABLE Saints (
        Id INT PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        FeastDay DATE NOT NULL,
        Patronages NVARCHAR(500)
    );
END
GO

INSERT INTO Saints (Id, Name, FeastDay, Patronages)
VALUES 
    (1, 'St. Francis of Assisi', '2025-10-04', 'Animals, Ecology'),
    (2, 'St. Augustine', '2025-08-28', 'Theologians'),
    (3, 'St. Teresa of Avila', '2025-10-15', 'Writers, Mystics'),
    (4, 'St. Daria & St. Chrysanthus', '2025-10-25', 'Judges'),
    (5, 'St. Demetrius', '2025-10-26', 'Soldiers, Courage');
GO

IF OBJECT_ID('History', 'U') IS NULL
BEGIN
    CREATE TABLE History (
        Id INT PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL,
        Year INT NOT NULL
    );
END
GO

INSERT INTO History (Id, Name, Year)
VALUES
    (1, 'Pentecost', 33),
    (2, 'Filioque added by Third Council of Toledo', 589),
    (3, 'Great Schism', 1054);
GO
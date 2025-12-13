\c saintsdb

TRUNCATE TABLE "Saints" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "History" RESTART IDENTITY CASCADE;

-- Insert Saints
INSERT INTO "Saints" ("Name", "FeastDay", "Patronages")
VALUES 
    ('St. Michael the Archangel', '2025-11-08', 'Defenders, Warriors, Soldiers'),
    ('St. John Chrysostom', '2025-11-13', 'Preachers, Theologians'),
    ('St. Philip the Apostle', '2025-11-14', 'Evangelists, Missionaries'),
    ('St. Abibus of Edessa', '2025-11-15', 'Contracts, Marriage, Syria'),
    ('St. Barlaam of Kiev', '2025-11-19', 'Spiritual Converts, Truth Seekers'),
    ('St. Gregory the Wonderworker', '2025-11-20', 'Miracles, Healing'),
    ('St. John of Damascus', '2025-11-27', 'Theologians, Hymnographers'),
    ('St. Saturninus of Toulouse', '2025-11-29', 'Toulouse'),
    ('St. Andrew of Crete', '2025-11-04', 'Homilists, Liturgists'),
    ('St. Catherine of Alexandria', '2025-11-25', 'Philosophers, Students'),
    ('St. Barbara', '2025-12-04', 'Miners, Architects, Firefighters'),
    ('St. John of Damascus', '2025-12-04', 'Theologians, Hymnographers'),
    ('St. Nicholas the Wonderworker', '2025-12-06', 'Children, Sailors, Merchants'),
    ('St. Spyridon of Trimythous', '2025-12-12', 'Miracles, Shepherds'),
    ('St. Herman of Alaska', '2025-12-13', 'Missionaries, Alaska, Orthodox Church'),
    ('St. Anastasia the Great Martyr', '2025-12-22', 'Pharmacists, Healers'),
    ('St. Ignatius the God-bearer', '2025-12-20', 'Martyrs, Theologians'),
    ('St. Ambrose of Milan', '2025-12-07', 'Bishops, Catechists'),
    ('St. Eleutherius of Illyria', '2025-12-15', 'Prisoners, Converts'),
    ('St. Juliana of Nicomedia', '2025-12-21', 'Martyrs, Nurses');

-- Insert History (Id will auto-increment)
INSERT INTO "History" ("Name", "Year")
VALUES
    ('Pentecost', 33),
    ('Council of Nicaea', 325),
    ('Cyril and Methodius begin evangelization to the Slavs', 863),
    ('Baptism of Kievan Rus by Prince Vladimir', 988),
    ('Great Schism (East-West split)', 1054),
    ('Union of Brest (creation of Ruthenian Catholic Church)', 1596),
    ('Union of Uzhhorod (Western Ukraine clergy join Rome)', 1646),
    ('First Russian Greek Catholic parish in St. Petersburg', 1807),
    ('Papal recognition of Russian Greek Catholic Church', 1905),
    ('Pope Pius X issues apostolic letter on Eastern Churches', 1907),
    ('First Russian Greek Catholic parish in Moscow re-established', 1991),
    ('Pope John Paul II encyclical on Eastern Churches and ecumenism', 1995);

CREATE DATABASE  IF NOT EXISTS `vacations_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations_db`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `likes_ibfk_2` (`vacation_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,1),(4,1),(4,7),(2,10);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','User','admin@vacations.com','123456',1),(2,'Bart','Simpson','bart@simpson.com','1234',2),(3,'Homer','Simpson','homer@simpson.com','1234',2),(4,'Lisa','Simpson','lisa@simpson.com','1234',2),(5,'Marge','Simpson','marge@simpson.com','1234',2),(6,'roy','bentzur','roy@test.com','123456',2),(7,'rony','pony','rony@pony.com','121212',2),(8,'roy','lala','roy@lala.com','123123',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `video_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` (`id`,`destination`,`description`,`start_date`,`end_date`,`price`,`image_name`) VALUES (1,'Hogwarts','Experience a full magical vacation at Hogwarts School of Witchcraft and Wizardry, where you become part of the wizarding world from the moment you arrive. Upon arrival,\n    you receive your personal wand, wizard robe,\n    broomstick, and a formal invitation to Platform 9¾.\n    From there, you are transported to Hogwarts and assigned to one of the four houses – Gryffindor, Slytherin, Ravenclaw, or Hufflepuff – each offering a different style of experience.\n    Your stay includes sleeping in house-based dormitories inside the castle, interacting with other students, and living the daily life of a wizard.\n    Meals are served in the Great Hall and include a variety of magical foods such as Butterbeer, enchanted desserts, and traditional wizarding dishes.\n    Activities include attending magical classes, exploring hidden areas of the castle, flying on broomsticks, and completing house-based challenges.\n    Gryffindor guests can take part in courage-driven missions and battles, while other houses experience unique paths aligned with their values.\n    The experience also includes real dangers. Guests may encounter dark creatures, hostile magic, and powerful enemies, including encounters inspired by the rise of dark forces within the wizarding world.\n    This is a fully immersive vacation where your choices, house, and actions shape your personal journey, making each stay unique.','2026-06-01','2026-06-10',2499.99,'1777110886046-Hogwarts.jpg'),(2,'The Matrix','Take the red pill… and discover how deep the reality goes.\n\nYou are not traveling to a destination –\nyou are entering a system designed to control everything you know.\n\nYour stay begins inside a secure resistance base\nlocated outside the Matrix, where you have private quarters,\nrest areas, and full recovery facilities between missions.\n\nFor those who prefer a more relaxed experience,\nthe system allows access to calm simulated environments –\nfrom peaceful cityscapes to quiet natural settings,\nperfect for rest and exploration without pressure.\n\nMeals are fully simulated and customizable,\nallowing you to experience any food, flavor, or cuisine instantly,\nfrom simple comfort meals to luxury dining experiences.\n\nInside the Matrix, you can choose your level of intensity.\nTrain in advanced simulation programs,\nexplore massive digital cities,\nor simply observe and enjoy the world around you.\n\nFor those seeking action, activities include combat simulations,\nhacking missions, and high-speed chases across dynamic environments.\n\nHowever, the system is always active.\n\nAgents and hostile programs may track unusual behavior,\ncreating moments of tension and challenge throughout your stay.\n\nThis is a flexible experience where you control the pace –\nwhether you seek relaxation, exploration, or full immersion into the system.','2026-07-01','2026-07-10',2799.99,'1777112252942-TheMatrix.jpg'),(3,'Atlantis','Descend beneath the ocean surface\ninto the lost city of Atlantis – a hidden world untouched by time.\n\nYour stay takes place in exclusive Atlantean living chambers,\nancient structures refined into private luxury spaces\nwhile preserving their original beauty and mystery.\n\nSurrounded by flowing water corridors\nand softly glowing architecture,\nyour environment offers both serenity and isolation\nfrom the outside world.\n\nLife in Atlantis moves at your pace.\nYou may choose quiet moments in hidden chambers,\nobserve rare marine life passing through the city,\nor explore its vast and ancient surroundings.\n\nDining is an elevated experience,\nbased on rare ocean ingredients and refined techniques\nunique to this forgotten civilization.\n\nFor those seeking more,\nprivate guided access to restricted areas is available –\nincluding ancient temples, sealed passages,\nand deeper sections of the city rarely seen.\n\nYet Atlantis remains unpredictable.\n\nUnstable zones, ancient mechanisms,\nand unexplored depths introduce elements of risk\nto those who choose to go further.\n\nAccess to Atlantis is strictly limited.\nIts location remains unknown –\nrevealed only to those who are invited to experience it.','2026-08-01','2026-08-10',4199.99,'1777112285598-Atlantis.jpg'),(4,'Wakanda','Step beyond the visible world\nand enter Wakanda – a kingdom hidden from time itself.\n\nA place where ancient tradition\nand unmatched technology exist in perfect harmony.\n\nYour stay takes place within the Golden City,\nin private luxury sanctuaries overlooking both skyline and savannah.\n\nEach suite blends authentic Wakandan design\nwith advanced smart systems that respond to your presence,\ncreating an experience that feels both grounded and futuristic.\n\nLife in Wakanda is not something you visit –\nit is something you are invited into.\n\nYou are granted exclusive access to the Great Bazaar,\nwhere innovation and tradition meet in ways unseen anywhere else.\n\nPrivate moments await within the Royal Gardens,\nor high above in the Jabari Mountains,\nwhere silence and power coexist.\n\nDining is a refined cultural experience,\nbuilt on bold flavors, rare ingredients,\nand traditions passed through generations.\n\nSelected guests may witness the strength of the Dora Milaje,\nor stand before the Black Panther monument at sunset –\na moment of pure presence.\n\nWakanda is not open to the world.\n\nIt reveals itself only to those chosen to experience it.','2026-07-10','2026-07-18',2899.99,'1777112272041-Wakanda.jpg'),(5,'Pandora','Enter a world that feels alive beneath your feet.\n\nPandora is not just a destination –\nit is a living, breathing ecosystem\nwhere every element responds to your presence.\n\nYour stay takes place in elevated luxury tree pods,\nsuspended high above the forest floor,\noffering panoramic views of a glowing, ever-changing landscape.\n\nAs night falls, the world transforms.\n\nThe ground beneath you begins to shimmer,\nplants emit soft waves of light,\nand the entire forest awakens in color and motion.\n\nDays are yours to experience – not just explore.\n\nYou will bond with your own Ikran,\nriding alongside the Na’vi through the skies,\ngliding between the floating Hallelujah Mountains\nin a way few outsiders have ever known.\n\nDrift through glowing river systems that mirror the stars,\nand stand in rare silence before the Tree of Souls –\na place where the energy of Pandora can truly be felt.\n\nGuided by the Na’vi themselves,\nyou will not simply visit this world –\nyou will become part of it.\n\nThere is no rush here.\n\nOnly stillness, beauty,\nand a connection deeper than anything you have known.\n\nDining is light, fresh, and immersive –\ncrafted in harmony with the natural balance of Pandora itself.\n\nThis is not a vacation of luxury alone.\n\nIt is a return to something deeper.\n\nAccess is limited.\n\nPandora reveals itself only to those chosen to feel it.','2026-09-05','2026-09-12',2599.99,'1777112303026-Pandora.jpg'),(6,'Jurassic Park','Welcome to an experience where nature reclaims its dominance.\n\nJurassic Park is not a theme park –\nit is a controlled ecosystem where prehistoric life walks once again.\n\nYour stay takes place in fortified luxury lodges,\ndesigned with reinforced glass and advanced security systems,\nallowing you to observe the world’s most powerful creatures\nfrom a position of comfort and control.\n\nBeyond the walls, the wild is very real.\n\nFrom your private terrace,\nyou may witness a Tyrannosaurus Rex moving through the landscape,\nor hear the distant calls of creatures long thought extinct.\n\nDays are guided, calculated, and unforgettable.\n\nYou are granted access to secured expedition routes,\nwhere you will encounter living dinosaurs up close –\nincluding the intelligent and unpredictable Velociraptors.\n\nEvery movement is monitored.\nEvery step is planned.\n\nAnd yet…\n\nthe feeling remains\nthat at any moment,\ncontrol can shift.\n\nBetween adrenaline and luxury,\nJurassic Park delivers an experience found nowhere else on Earth.\n\nDining is refined, served within secured zones,\nallowing you to relax while the wild continues just beyond your reach.\n\nSome places leave you with memories.\n\nThis one leaves you with a heartbeat you will never forget.','2026-10-01','2026-10-08',2799.99,'1777112316534-Jurassic-Park.jpg'),(7,'Neverland','Leave time behind and step into a world where freedom has no limits.\n\nNeverland is not a place you visit –\nit is a place you remember.\n\nYour arrival begins with a soft glow in the air,\nas Tinker Bell herself welcomes you into a world untouched by time.\n\nYour stay takes place on floating island suites,\nsuspended in endless skies,\nwhere soft winds and golden light surround you at all times.\n\nThere are no clocks here.\nNo schedules.\nNo expectations.\n\nDays unfold as you choose.\n\nYou may take flight alongside Peter Pan himself,\nsoaring across open skies,\nor explore hidden lagoons and enchanted forests\nwhere every path feels like a story waiting to be lived.\n\nFrom playful moments with the Lost Boys\nto unexpected crossings with Captain Hook,\neach experience carries a sense of wonder and excitement.\n\nAdventure exists,\nbut never at the cost of comfort.\n\nYour space remains private, refined,\nand always within reach when you wish to return.\n\nDining is light, joyful, and effortless –\ndesigned to match the spirit of a world untouched by time.\n\nSome places take you away from reality.\n\nNeverland reminds you what it feels like to be free.','2026-06-15','2026-06-22',2399.99,'1777110774527-Neverland.jpg'),(8,'Narnia','Step through the wardrobe\nand enter a world where winter never fades.\n\nNarnia is a land of quiet magic,\nwhere snow-covered forests stretch endlessly\nand every moment feels like part of an ancient story.\n\nYour stay takes place within royal winter suites,\ndesigned with warm interiors, glowing fireplaces,\nand panoramic views of a frozen kingdom.\n\nOutside, the world is still and breathtaking.\n\nSnow falls gently across the land,\nand the silence carries a sense of wonder\nthat cannot be found anywhere else.\n\nDays are filled with discovery.\n\nWalk through enchanted forests,\nride across open snowy plains,\nor find yourself standing in places\nwhere legends were once written.\n\nEncounters here are rare, but unforgettable.\n\nThe presence of Aslan can be felt,\nnot seen –\na quiet reminder that this world holds something greater.\n\nTime moves differently in Narnia.\n\nMoments feel longer,\ndeeper,\nmore meaningful.\n\nDining is warm and comforting,\ncrafted to match the calm and beauty of a world in eternal winter.\n\nSome worlds are visited.\n\nNarnia is simply found.','2026-12-01','2026-12-08',2499.99,'1777112346836-Narnia.jpg'),(9,'Game of Thrones','Enter Westeros – a land of legendary castles, royal courts,\nand stories shaped by power, loyalty, and ambition.\n\nYour stay takes place within the Great Strongholds,\nfrom the golden towers of King’s Landing\nto the cold, enduring halls of the North.\n\nEach residence blends medieval grandeur with refined comfort,\noffering stone balconies, royal chambers,\nand views that have witnessed the rise and fall of kings.\n\nDays unfold through unforgettable experiences.\n\nRide beyond the Wall alongside Jon Snow,\ncrossing frozen landscapes where silence carries weight.\n\nSail across the narrow sea with Daenerys Targaryen,\nas dragons carve the sky above you on the journey toward conquest.\n\nWalk the halls of King’s Landing,\nwhere Cersei and Jaime Lannister rule with quiet intensity,\nand every glance holds meaning.\n\nStand beside Tyrion Lannister in chambers of strategy,\nwhere words can shape the fate of entire kingdoms.\n\nFeasts are grand and unforgettable,\nserved in great halls filled with fire, music,\nand the presence of those who hold power.\n\nWesteros is a world of beauty and tension,\nwhere every moment feels significant,\nand every path leads to something greater.','2026-11-01','2026-11-08',2699.99,'1777112329967-GOT.jpg'),(10,'Lord of the Rings','Not every vacation begins with a destination.\nSome begin with a world.\n\nMiddle-earth is a land of magical forests, ancient kingdoms,\nmountain halls, and wide open fields —\nwhere every stay feels like stepping into a living legend.\n\nYour vacation can take many forms,\nshaped by the world around you\nand the feeling you choose to follow.\n\nYou may wake up in a peaceful elven retreat,\nhidden among glowing trees and flowing waterfalls,\nwhere everything feels calm, clean,\nand almost untouched by time.\n\nDays pass slowly here,\nwith fresh air, quiet moments,\nand evenings filled with fine food,\nsoft music, and warm golden light.\n\nAs the journey continues,\nthe world opens into great human kingdoms —\nalive with movement, voices, and life.\n\nStone cities, open courtyards, rich feasts,\nand welcoming halls create a place\nwhere families, friends, and travelers\ncome together and feel at home.\n\nAnd beyond them, the land stretches into wide open plains,\nwhere riders and warriors live\nwith freedom and strength.\n\nHere, days are filled with motion,\nstrong company, hearty meals,\nand nights beneath vast skies\nthat feel endless.\n\nFrom elegant woodland stays\nto lively kingdoms and open horizons,\nMiddle-earth offers a vacation\nthat can be calm, vibrant, or bold —\nall within the same unforgettable world.','2026-12-01','2026-12-08',2799.99,'1777112362900-LOTR.jpg'),(11,'One Piece','ONE PIECE: THE TIDES OF FATE\nStep beyond the horizon\nand decide which side of history you will stand on.\n\nThe Grand Line was never meant to be a simple vacation —\nand that is exactly what makes it unforgettable.\nIt is a world where the sea defies logic,\nand your will is the only thing that keeps you afloat.\n\nThe Straw Hat Bond:\nYour stay takes place on the grass-covered deck of the Thousand Sunny,\nwhere the air is filled with Brook’s music and the laughter of legends.\nThis is not a ship — it is a family.\nRaise a sake cup in a drinking contest with Zoro,\nfeast on Sea King banquet prepared by Sanji,\nor spend a quiet hour mapping the stars with Nami.\n\nBefore the final voyage,\nsecret training awaits in the shadows of Sabaody,\nwhere you will awaken your Haki under the guidance\nof the Dark King, Rayleigh.\n\nThe Celestial Luxury:\nFor those who seek absolute, detached power,\nexclusive sanctuary awaits within the white walls of Mary Geoise.\nAbove the clouds, you live as a Celestial Dragon —\nwhere your every whim is a command,\nand the world below is but a shadow.\n\nThe Marine Discipline:\nOr, find your strength within the iron walls of Marineford.\nTrain in the legendary Rokushiki styles under the Admirals,\ncommand a battleship through the Calm Belt,\nand witness the cold, absolute justice of the World Government.\n\nStay in quiet coastal villages,\naboard legendary ships,\nor in places far removed from the chaos of the seas.\n\nEvery island is a new reality.\nWander the bubble-covered groves of Sabaody,\nbrave the giant-filled snows of Elbaf,\nor witness the ancient secrets hidden within the Poneglyphs.\n\nNot every moment is a battle —\nsome are meant to be lived slowly,\nbetween islands, stories, and the rhythm of the sea.\n\nThere is a wild electricity in the air —\nthe feeling that the Great Era of Pirates is reaching its peak,\nand you are at the center of the storm.\n\nSome oceans are navigated.\nThis one is claimed with a roar.\n\nSome journeys call only to those who feel it —\nthe question is whether you are ready to answer.','2027-01-10','2027-01-17',2899.99,'1777112382594-One Piece.jpg'),(12,'Asgard','ASGARD: THE GOLDEN ASCENT\nStep across the Bifrost bridge\nand enter a world of eternal gold and soaring spires.\nAsgard is not merely a kingdom –\nit is a realm of divine power, where ancient legacy\nmeets a future written in the stars.\n\nYour stay is hosted within the Royal Palace of Valhalla, where you live as an honored guest of the gods. In grand private suites draped in enchanted silk, every whim is attended to by divine servants, and every evening ends in a legendary banquet of mead and music.\n\nBut Asgard rewards more than just status.\n\nDuring your stay, you will be granted a rare opportunity to prove your resolve before the All-Father. No map can prepare you for this test, and no one can tell you when it will begin. It is a moment of pure character, hidden within the daily life of the Golden City, where you must prove yourself worthy of the gods.\n\nIf your spirit is found worthy, the All-Father himself will summon you to the Throne Room.\n\nThere, in the presence of the King, Odin grants you the power required to stand beside Thor himself.\n\nJoin the God of Thunder on daring expeditions across the Nine Realms, from the frozen wastes of Jotunheim to the fires of Muspelheim. Experience the thrill of battle alongside a legend, knowing your spirit has been forged in the same fire as the gods.\n\nAfter the dust of battle settles, the true reward begins.\n\nReturn to the palace for a Hero’s Banquet, where your stories are toasted by legends, and the glory of your deeds becomes part of the golden halls forever.\n\nSome worlds are ruled.\nThis one is earned.\n\nAccess is granted only to those with the spirit of a God.','2027-02-01','2027-02-14',3499.99,'1777112397453-Asgard.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-22 23:52:34

-- Fix video_name for all vacations:
UPDATE `vacations` SET `video_name` = '1776898449100-Hogwarts-video.mp4' WHERE `id` = 1;
UPDATE `vacations` SET `video_name` = '1777107646820-The-Mattrix-video.mp4' WHERE `id` = 2;
UPDATE `vacations` SET `video_name` = '1777107703662-Atlantis-video.mp4' WHERE `id` = 3;
UPDATE `vacations` SET `video_name` = '1777107671584-Wakanda-video.mp4' WHERE `id` = 4;
UPDATE `vacations` SET `video_name` = '1777107720977-Pandora-video.mp4' WHERE `id` = 5;
UPDATE `vacations` SET `video_name` = '1777107749767-JurassicPark-video.mp4' WHERE `id` = 6;
UPDATE `vacations` SET `video_name` = '1777107616857-Neverland-video.mp4' WHERE `id` = 7;
UPDATE `vacations` SET `video_name` = '1777107819799-Narnia-video.mp4' WHERE `id` = 8;
UPDATE `vacations` SET `video_name` = '1777107770236-GOT-video.mp4' WHERE `id` = 9;
UPDATE `vacations` SET `video_name` = '1777107839930-LOTR-video.mp4' WHERE `id` = 10;
UPDATE `vacations` SET `video_name` = '1777136174053-OnePiece-video.mp4' WHERE `id` = 11;
UPDATE `vacations` SET `video_name` = '1777136285227-Asgard-video.mp4' WHERE `id` = 12;

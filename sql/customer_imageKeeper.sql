DROP TABLE IF EXISTS `image_keeper`;
CREATE TABLE `image_keeper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` LONGBLOB NULL,
  `customer_email` varchar(50) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
 );


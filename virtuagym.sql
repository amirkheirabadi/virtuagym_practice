/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50635
 Source Host           : localhost:3306
 Source Schema         : virtuagym

 Target Server Type    : MySQL
 Target Server Version : 50635
 File Encoding         : 65001

 Date: 09/03/2018 22:44:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for assings
-- ----------------------------
DROP TABLE IF EXISTS `assings`;
CREATE TABLE `assings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `plan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for exercise
-- ----------------------------
DROP TABLE IF EXISTS `exercise`;
CREATE TABLE `exercise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of exercise
-- ----------------------------
BEGIN;
INSERT INTO `exercise` VALUES (1, 'Crunch');
INSERT INTO `exercise` VALUES (2, 'Air squat');
INSERT INTO `exercise` VALUES (3, 'Windmill');
INSERT INTO `exercise` VALUES (4, 'Push-up');
INSERT INTO `exercise` VALUES (5, 'Rowing Machine');
INSERT INTO `exercise` VALUES (6, 'Walking');
INSERT INTO `exercise` VALUES (7, 'Running');
COMMIT;

-- ----------------------------
-- Table structure for exercise_instances
-- ----------------------------
DROP TABLE IF EXISTS `exercise_instances`;
CREATE TABLE `exercise_instances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exercise_id` int(11) NOT NULL,
  `day_id` int(11) NOT NULL COMMENT 'optional, filled when this is part of a trainingplan (day)',
  `exercise_duration` int(11) NOT NULL DEFAULT '0' COMMENT 'duration in seconds',
  `order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of exercise_instances
-- ----------------------------
BEGIN;
INSERT INTO `exercise_instances` VALUES (3, 1, 13, 1000, 0);
INSERT INTO `exercise_instances` VALUES (4, 4, 14, 100, 0);
COMMIT;

-- ----------------------------
-- Table structure for plan
-- ----------------------------
DROP TABLE IF EXISTS `plan`;
CREATE TABLE `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(150) NOT NULL COMMENT 'contains plan name',
  `plan_description` text NOT NULL COMMENT 'contains plan description (optional)',
  `plan_difficulty` int(1) NOT NULL DEFAULT '1' COMMENT '1=beginner,2=intermediate,3=expert',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COMMENT='contains basic plan data';

-- ----------------------------
-- Records of plan
-- ----------------------------
BEGIN;
INSERT INTO `plan` VALUES (1, 'My first planssds', 'Just a dummy :-)', 2);
COMMIT;

-- ----------------------------
-- Table structure for plan_days
-- ----------------------------
DROP TABLE IF EXISTS `plan_days`;
CREATE TABLE `plan_days` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) NOT NULL COMMENT 'id from plan table',
  `day_name` varchar(100) NOT NULL DEFAULT '' COMMENT 'name for this day, optional',
  `order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of plan_days
-- ----------------------------
BEGIN;
INSERT INTO `plan_days` VALUES (13, 1, 'amir', 1);
INSERT INTO `plan_days` VALUES (14, 1, 'Day 1 - Cardioo', 2);
COMMIT;

-- ----------------------------
-- Table structure for plan_users
-- ----------------------------
DROP TABLE IF EXISTS `plan_users`;
CREATE TABLE `plan_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of plan_users
-- ----------------------------
BEGIN;
INSERT INTO `plan_users` VALUES (13, '1', '1');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'amir', 'al', 'amir@gmail.com');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

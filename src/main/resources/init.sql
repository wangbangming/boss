/*
Navicat MySQL Data Transfer

Source Server         : my
Source Server Version : 50622
Source Host           : 118.31.74.6:3306
Source Database       : boss

Target Server Type    : MYSQL
Target Server Version : 50622
File Encoding         : 65001

Date: 2017-11-03 10:45:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_intercept_url
-- ----------------------------
DROP TABLE IF EXISTS `tb_intercept_url`;
CREATE TABLE `tb_intercept_url` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url_pattern` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `last_update_by` bigint(20) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT NULL,
  `row_version` int(11) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_intercept_url
-- ----------------------------
INSERT INTO `tb_intercept_url` VALUES ('1', '/index.html', null, null, '-1', '2015-09-22 14:12:34', null, '2015-09-22 14:12:34', '1', '1');
INSERT INTO `tb_intercept_url` VALUES ('2', '/rest/suppliers', null, null, '-1', '2015-09-22 14:13:03', null, '2015-09-22 14:13:03', '1', '1');

-- ----------------------------
-- Table structure for tb_sidebar_menu
-- ----------------------------
DROP TABLE IF EXISTS `tb_sidebar_menu`;
CREATE TABLE `tb_sidebar_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ui_sref` varchar(50) DEFAULT NULL,
  `i_class` varchar(50) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `menu_text` varchar(50) DEFAULT NULL,
  `is_leaf` tinyint(1) DEFAULT NULL,
  `description` varchar(255) default null,
  `status` tinyint(1) default null,
  `create_by` bigint(20) default null,
  `create_date` timestamp null default null,
  `last_update_by` bigint(20) default null,
  `last_update_date` timestamp null default null,
  `row_version` int(11) default null,
  `is_valid` tinyint(1) default null,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_sidebar_menu
-- ----------------------------
INSERT INTO `tb_sidebar_menu` VALUES ('1', null, null, null, 'root', '0', null, null, '-1', '2015-09-29 10:25:50', null, '2015-09-29 10:25:50', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('2', 'app.supplier', 'menu-icon glyphicon glyphicon-tasks', '1', '一级菜单1', '1', null, null, '-1', '2015-09-29 10:30:46', null, '2015-09-29 10:30:46', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('3', 'app.supplier', 'menu-icon glyphicon glyphicon-stats', '1', '一级菜单2', '0', null, null, '-1', '2015-09-29 10:32:52', null, '2015-09-29 10:32:52', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('4', 'app.supplier', 'menu-icon typcn typcn-location-outline', '3', '二级菜单1', '0', null, null, '-1', '2015-09-29 10:34:49', null, '2015-09-29 10:34:49', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('5', 'app.supplier', 'menu-icon wi wi-hot', '3', '二级菜单2', '1', null, null, '-1', '2015-09-29 10:35:58', null, '2015-09-29 10:35:58', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('6', 'app.supplier', 'menu-icon fa fa-desktop', '4', '三级菜单1', '1', null, null, '-1', '2015-09-29 10:37:58', null, '2015-09-29 10:37:58', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('7', 'app.supplier', 'menu-icon fa fa-desktop', '4', '三级菜单2', '1', null, null, '-1', '2015-09-29 14:54:55', null, '2015-09-29 14:54:55', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('8', 'app.supplier', 'menu-icon fa fa-desktop', '4', '三级菜单3', '1', null, null, '-1', '2015-09-29 14:55:25', null, '2015-09-29 14:55:25', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('9', 'app.user', 'menu-icon glyphicon glyphicon-user', '1', '后台用户管理', '1', null, null, '-1', '2015-10-22 14:04:12', null, '2015-10-22 14:04:12', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('10', 'app.role', 'menu-icon typcn typcn-user-outline', '1', '角色管理', '1', null, null, '-1', '2015-10-22 14:06:20', null, '2015-10-22 14:06:20', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('11', 'app.menu', 'menu-icon glyphicon glyphicon-list', '1', '菜单管理', '1', null, null, '-1', '2015-10-22 14:07:40', null, '2015-10-22 14:07:40', '1', '1');
INSERT INTO `tb_sidebar_menu` VALUES ('12', 'app.url', 'menu-icon glyphicon glyphicon-eye-open', '1', '后台URL管理', '1', null, null, '-1', '2015-10-22 14:08:47', null, '2015-10-22 14:08:47', '1', '1');

-- ----------------------------
-- Table structure for tb_supplier
-- ----------------------------
DROP TABLE IF EXISTS `tb_supplier`;
CREATE TABLE `tb_supplier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(32) DEFAULT NULL,
  `supplier_email` varchar(32) DEFAULT NULL,
  `contact_name` varchar(32) DEFAULT NULL,
  `contact_phone` varchar(32) DEFAULT NULL,
  `status_display` varchar(2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `last_update_by` bigint(20) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT NULL,
  `row_version` int(11) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_supplier
-- ----------------------------
INSERT INTO `tb_supplier` VALUES ('1', '供应商1', '1234@123.com', '中文', '123', null, null, null, '-1', '2015-10-07 15:14:35', null, '2015-10-07 15:14:35', '1', '1');
INSERT INTO `tb_supplier` VALUES ('2', '供应商2', '123@123.com', '123', '123', null, null, null, '-1', '2015-10-08 11:20:23', null, '2015-10-08 11:20:23', '1', '1');
INSERT INTO `tb_supplier` VALUES ('3', '123', null, '123', '123', null, null, null, '-1', '2015-11-05 17:21:09', null, '2015-11-05 17:21:09', '1', '1');

-- ----------------------------
-- Table structure for tb_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_sys_role`;
CREATE TABLE `tb_sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  `role_code` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `last_update_by` bigint(20) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT NULL,
  `row_version` int(11) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_sys_role
-- ----------------------------
INSERT INTO `tb_sys_role` VALUES ('1', '管理员', 'admin', null, null, '-1', '2015-09-22 14:30:30', null, '2015-09-22 14:30:30', '1', '1');
INSERT INTO `tb_sys_role` VALUES ('2', '普通用户', 'user', null, null, '-1', '2015-09-22 14:31:56', null, '2015-09-22 14:31:56', '1', '1');
INSERT INTO `tb_sys_role` VALUES ('3', '角色2', 'role2', null, null, '-1', '2015-10-14 16:10:15', null, '2015-10-14 16:10:15', '1', '1');

-- ----------------------------
-- Table structure for tb_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_sys_user`;
CREATE TABLE `tb_sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `mobile_phone` varchar(15) DEFAULT NULL,
  `office_phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `last_update_by` bigint(20) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT NULL,
  `row_version` int(11) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_sys_user
-- ----------------------------
INSERT INTO `tb_sys_user` VALUES ('1', 'admin', '管理员', '21232f297a57a5a743894a0e4a801fc3', null, null, null, null, null, '-1', '2015-10-15 16:12:29', null, '2015-10-15 16:12:29', '1', '1');
INSERT INTO `tb_sys_user` VALUES ('2', 'user', '普通用户', 'ee11cbb19052e40b07aac0ca060c23ee', null, null, null, null, null, '-1', '2015-10-15 16:17:02', null, '2015-10-15 16:17:02', '1', '1');

-- ----------------------------
-- Table structure for tr_role_url
-- ----------------------------
DROP TABLE IF EXISTS `tr_role_url`;
CREATE TABLE `tr_role_url` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) DEFAULT NULL,
  `url_id` bigint(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `last_update_by` bigint(20) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT NULL,
  `row_version` int(11) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tr_role_url
-- ----------------------------
INSERT INTO `tr_role_url` VALUES ('1', '1', '1', null, null, '-1', '2015-09-22 14:40:10', '-1', '2015-11-05 17:07:32', '2', '1');
INSERT INTO `tr_role_url` VALUES ('2', '2', '1', null, null, '-1', '2015-09-22 14:40:37', null, '2015-09-22 14:40:37', '1', '1');
INSERT INTO `tr_role_url` VALUES ('3', '1', '2', null, null, '-1', '2015-09-22 14:41:00', '-1', '2015-11-05 17:07:32', '2', '1');
INSERT INTO `tr_role_url` VALUES ('4', '2', '2', null, null, '-1', '2015-09-22 14:41:22', null, '2015-09-22 14:41:22', '1', '1');
INSERT INTO `tr_role_url` VALUES ('5', '3', '2', null, null, '-1', '2015-09-23 16:30:42', null, '2015-09-23 16:30:42', '1', '1');
INSERT INTO `tr_role_url` VALUES ('10', '1', '1', null, null, '-1', '2015-11-05 17:07:32', '-1', '2015-11-05 17:21:49', '2', '1');
INSERT INTO `tr_role_url` VALUES ('11', '1', '1', null, null, '-1', '2015-11-05 17:21:49', null, '2015-11-05 17:21:49', '1', '1');
INSERT INTO `tr_role_url` VALUES ('12', '1', '2', null, null, '-1', '2015-11-05 17:21:49', null, '2015-11-05 17:21:49', '1', '1');

-- ----------------------------
-- Table structure for tr_sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `tr_sys_role_menu`;
CREATE TABLE `tr_sys_role_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `menu_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `last_update_by` bigint(20) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT NULL,
  `row_version` int(11) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tr_sys_role_menu
-- ----------------------------
INSERT INTO `tr_sys_role_menu` VALUES ('1', '2', '1', null, null, '-1', '2015-10-04 09:30:48', '-1', '2015-10-22 14:12:51', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('2', '3', '1', null, null, '-1', '2015-10-04 09:31:58', '-1', '2015-10-22 14:12:51', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('3', '4', '1', null, null, '-1', '2015-10-04 09:32:22', '-1', '2015-10-22 14:12:51', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('4', '5', '1', null, null, '-1', '2015-10-04 09:32:48', '-1', '2015-10-22 14:12:51', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('5', '6', '1', null, null, '-1', '2015-10-04 09:33:21', '-1', '2015-10-22 14:12:52', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('6', '7', '1', null, null, '-1', '2015-10-04 09:33:46', '-1', '2015-10-22 14:12:52', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('7', '8', '1', null, null, '-1', '2015-10-04 09:34:07', '-1', '2015-10-22 14:12:52', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('8', '2', '2', null, null, '-1', '2015-10-04 09:35:24', '-1', '2015-10-21 16:12:16', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('9', '3', '2', null, null, '-1', '2015-10-04 09:35:48', '-1', '2015-10-21 16:12:16', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('10', '4', '2', null, null, '-1', '2015-10-04 09:36:09', '-1', '2015-10-21 16:12:16', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('11', '5', '2', null, null, '-1', '2015-10-04 09:36:39', '-1', '2015-10-21 16:12:16', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('12', '6', '2', null, null, '-1', '2015-10-04 09:38:24', '-1', '2015-10-21 16:12:16', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('13', '2', '2', null, null, '-1', '2015-10-21 16:12:16', '-1', '2015-10-21 16:12:52', '2', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('14', '2', '2', null, null, '-1', '2015-10-21 16:12:52', null, '2015-10-21 16:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('15', '3', '2', null, null, '-1', '2015-10-21 16:12:52', null, '2015-10-21 16:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('16', '4', '2', null, null, '-1', '2015-10-21 16:12:52', null, '2015-10-21 16:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('17', '6', '2', null, null, '-1', '2015-10-21 16:12:52', null, '2015-10-21 16:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('18', '5', '2', null, null, '-1', '2015-10-21 16:12:52', null, '2015-10-21 16:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('24', '2', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('25', '3', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('26', '4', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('27', '6', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('28', '7', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('29', '8', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('30', '5', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('31', '9', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('32', '10', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('33', '11', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');
INSERT INTO `tr_sys_role_menu` VALUES ('34', '12', '1', null, null, '-1', '2015-10-22 14:12:52', null, '2015-10-22 14:12:52', '1', '1');

-- ----------------------------
-- Table structure for tr_sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `tr_sys_user_role`;
CREATE TABLE `tr_sys_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `last_update_by` bigint(20) DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT NULL,
  `row_version` int(11) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tr_sys_user_role
-- ----------------------------
INSERT INTO `tr_sys_user_role` VALUES ('1', '1', '1', null, null, '-1', '2015-09-22 15:47:14', '-1', '2015-10-14 17:56:00', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('2', '2', '2', null, null, '-1', '2015-09-22 15:47:43', null, '2015-09-22 15:47:43', '1', '1');
INSERT INTO `tr_sys_user_role` VALUES ('3', '7', '1', null, null, '-1', '2015-10-14 17:53:04', '-1', '2015-10-14 17:53:12', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('4', '7', '2', null, null, '-1', '2015-10-14 17:53:05', '-1', '2015-10-14 17:53:12', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('9', '7', '1', null, null, '-1', '2015-10-14 17:53:22', '-1', '2015-10-14 17:55:30', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('10', '7', '2', null, null, '-1', '2015-10-14 17:53:22', '-1', '2015-10-14 17:55:30', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('16', '7', '1', null, null, '-1', '2015-10-14 17:55:30', '-1', '2015-10-14 17:57:09', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('18', '1', '1', null, null, '-1', '2015-10-14 17:56:22', null, '2015-10-14 17:56:22', '1', '1');
INSERT INTO `tr_sys_user_role` VALUES ('19', '7', '1', null, null, '-1', '2015-10-15 11:30:45', '-1', '2015-10-15 11:31:01', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('20', '18', '1', null, null, '-1', '2015-10-15 16:34:01', '-1', '2015-10-15 16:34:23', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('21', '18', '2', null, null, '-1', '2015-10-15 16:34:23', '-1', '2015-10-15 17:03:44', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('22', '21', '1', null, null, '-1', '2015-10-16 10:04:13', '-1', '2015-10-16 10:04:41', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('23', '21', '2', null, null, '-1', '2015-10-16 10:04:41', '-1', '2015-10-16 10:06:57', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('24', '21', '2', null, null, '-1', '2015-10-16 10:06:57', '-1', '2015-10-16 14:09:48', '2', '1');
INSERT INTO `tr_sys_user_role` VALUES ('33', '24', '1', null, null, '-1', '2015-10-16 15:31:47', '-1', '2015-10-16 15:32:16', '2', '1');

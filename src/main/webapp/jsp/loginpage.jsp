<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<link rel="stylesheet" href="$ {pageContext.request.contextPath }/bower_components/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="$ {pageContext.request.contextPath }/bower_components/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="$ {pageContext.request.contextPath }/bower_components/weather-icons/css/weather-icons.min.css" />

    <link rel="stylesheet" href="$ {pageContext.request.contextPath }/bower_components/typicons/src/font/typicons.min.css" />
    <link rel="stylesheet" href="$ {pageContext.request.contextPath }/bower_components/animate.css/animate.min.css" />

    <link href="$ {pageContext.request.contextPath }/assets/css/beyond.min.css" rel="stylesheet" />
    <link href="$ {pageContext.request.contextPath }/assets/css/demo.min.css" rel="stylesheet" />

</head>
<body>

	<div id="login-error">${error}</div>

	<form action="../j_spring_security_check" method="post">

		<input
			id="_spring_security_remember_me" name="_spring_security_remember_me"
			type="hidden" value="true" />

		<div class="login-container animated fadeInDown">
			<div class="loginbox bg-white">
				<div class="loginbox-title">SIGN IN</div>
				<div class="loginbox-social">
					<div class="social-title ">Connect with Your Social Accounts</div>
					<div class="social-buttons">
						<a href="" class="button-facebook"> <i
							class="social-icon fa fa-facebook"></i>
						</a> <a href="" class="button-twitter"> <i
							class="social-icon fa fa-twitter"></i>
						</a> <a href="" class="button-google"> <i
							class="social-icon fa fa-google-plus"></i>
						</a>
					</div>
				</div>
				<div class="loginbox-or">
					<div class="or-line"></div>
					<div class="or">OR</div>
				</div>
				<div class="loginbox-textbox">
					<input type="text" class="form-control" placeholder="Account" id="j_username" name="j_username"/>
				</div>
				<div class="loginbox-textbox">
					<input type="text" class="form-control" placeholder="Password" id="j_password" name="j_password"/>
				</div>
				<div class="loginbox-forgot">
					<a href="">Forgot Password?</a>
				</div>
				<div class="loginbox-submit">
					<input type="submit" class="btn btn-primary btn-block"
						value="Login">
				</div>
				<div class="loginbox-signup">
					<a href="register.html">Sign Up With Email</a>
				</div>
			</div>
			<div class="logobox"></div>
		</div>

	</form>

</body>
</html>
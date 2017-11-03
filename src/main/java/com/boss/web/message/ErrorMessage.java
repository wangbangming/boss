package com.boss.web.message;

/**
 * 页面用于显示的信息
 * @author WangBangMing
 *
 */
public class ErrorMessage {

	private String message;

	public ErrorMessage(String message) {
		super();
		this.message = message;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}

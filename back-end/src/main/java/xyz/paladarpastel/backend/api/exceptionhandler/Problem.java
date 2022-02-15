package xyz.paladarpastel.backend.api.exceptionhandler;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Builder;
import lombok.Getter;

@JsonInclude(value = Include.NON_NULL)
@Builder
@Getter
public class Problem {

	private Integer status;
	private String type;
	private String title;
	private String detail;
	private String userMessage;
	private List<Field> fields;

	@Getter
	@Builder
	public static class Field {
		private String name;
		private String userMessage;
	}

}

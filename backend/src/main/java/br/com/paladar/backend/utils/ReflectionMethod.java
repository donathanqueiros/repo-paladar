package br.com.paladar.backend.utils;

import java.util.List;
import java.util.stream.Collectors;

import com.intersult.code.JavaMethod;
import com.intersult.code.Reflector;

public class ReflectionMethod {

	public static List<String> nomesVariaveisParametro(String nomeParametro, Class classe) {
		Reflector reflector = new Reflector();
		JavaMethod method = reflector.reflect(classe).getMethods().stream()
				.filter(m -> nomeParametro.equals(m.getName())).findFirst().get();
		List<String> vars = method.getParameters().getVariables().stream().map(var -> var.getName())
				.collect(Collectors.toList());

		return vars;
	}

}

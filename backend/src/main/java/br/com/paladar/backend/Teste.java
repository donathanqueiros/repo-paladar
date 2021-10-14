package br.com.paladar.backend;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

public class Teste {

	public static void main(String[] args) throws NoSuchMethodException, SecurityException, IOException {
		Integer valor = 10;
		// ArgumentReflection.getParameterNames(Teste.class.getMethod("func",
		// Integer.class));

//		ReflectionMethod.nomesVariaveisParametro("func", Teste.class).forEach(v -> System.out.println(v));
//		;

//		System.out.println();
//		
//		Reflector r = new Reflector();
//		
//		
//		JavaClass valor2 = r.reflect(valor.getClass());
//		
//		System.out.println(valor2.equals(valor));
//
		System.out.println(Paths.get("/imagens/").toAbsolutePath().toString() + File.separator + 1 + ".png");

	}

	void func(Integer teste, String teste2) {

	}

}

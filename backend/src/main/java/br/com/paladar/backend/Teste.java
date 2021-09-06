package br.com.paladar.backend;

import java.io.IOException;
import java.lang.reflect.Type;

import com.intersult.code.JavaClass;
import com.intersult.code.JavaVariable;
import com.intersult.code.Reflector;

import br.com.paladar.backend.utils.ReflectionMethod;

public class Teste {

	public static void main(String[] args) throws NoSuchMethodException, SecurityException, IOException {
		Integer valor = 10;
		// ArgumentReflection.getParameterNames(Teste.class.getMethod("func",
		// Integer.class));

//		ReflectionMethod.nomesVariaveisParametro("func", Teste.class).forEach(v -> System.out.println(v));
//		;

		
		System.out.println();
		
		Reflector r = new Reflector();
		
		
		JavaClass valor2 = r.reflect(valor.getClass());
		
		System.out.println(valor2.equals(valor));

		System.out.println(r.reflect(valor.getClass()));

	}

	void func(Integer teste, String teste2) {

	}

}

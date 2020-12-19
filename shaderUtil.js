class shaderUtil{
	
	static getShader(id){

		var shader = document.getElementById(id);

		return shader.text;

	}

	static criarShader(gl,code,tipo){

		var shader = gl.createShader(tipo);

		gl.shaderSource(shader,code);
		gl.compileShader(shader);

		return shader;

	}

	static criarPrograma(gl,vert_shader,frag_shader){

		var programa = gl.createProgram();
		
		gl.attachShader(programa,vert_shader);
		gl.attachShader(programa,frag_shader);

		gl.bindAttribLocation(programa,0,"a_position");
		gl.bindAttribLocation(programa,1,"a_norm");
		gl.bindAttribLocation(programa,2,"a_uv");
		
		gl.linkProgram(programa);

		gl.deleteShader(vert_shader);
		gl.deleteShader(frag_shader);

		return programa;

	}

	static criarProgramaTxt(gl,vert_shader_id,frag_shader_id){

		var vert_shader = shaderUtil.criarShader(gl,vert_shader_id,gl.VERTEX_SHADER);	
		var frag_shader = shaderUtil.criarShader(gl,frag_shader_id,gl.FRAGMENT_SHADER);

		var programa = shaderUtil.criarPrograma(gl,vert_shader,frag_shader);

		return programa;

	}

	static getLocalDosAtributos(gl,programa){
		
		return {position:gl.getAttribLocation(programa,"a_position"),normal:gl.getAttribLocation(programa,"a_norm"),uv:gl.getAttribLocation(programa,"a_uv")};
	
	}

	static criarProgramaID(gl,vert_shader_id,frag_shader_id){
		
		var vert_shader_txt = shaderUtil.getShader(vert_shader_id);								
		var frag_shader_txt = shaderUtil.getShader(frag_shader_id);

		var vert_shader	= shaderUtil.criarShader(gl,vert_shader_txt,gl.VERTEX_SHADER);
		var vert_shader	= shaderUtil.criarShader(gl,frag_shader_txt,gl.FRAGMENT_SHADER);	
		
		return shaderUtil.criarPrograma(gl,vert_shader,frag_shader);

	}

}
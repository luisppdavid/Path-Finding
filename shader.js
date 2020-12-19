class shader{
	
	constructor(gl,vert_shader,frag_shader){

		this.programa = shaderUtil.criarProgramaTxt(gl,vert_shader,frag_shader);

		if(this.programa != null){
			
			this.gl = gl;
			gl.useProgram(this.programa);
			this.localAtributos = shaderUtil.getLocalDosAtributos(gl,this.programa);

		}
	}

	ativar(){

		this.gl.useProgram(this.programa);
		return this;

	}

	desativar(){

		this.gl.useProgram(null);
		return this;

	}

	renderizar(modelo){

		this.gl.bindVertexArray(modelo.mesh.vao);	
		
		if(modelo.mesh.indexCount){
			
			this.gl.drawElements(modelo.mesh.drawMode, modelo.mesh.indexLength, gl.UNSIGNED_SHORT, 0);

		}else{ 
			
			this.gl.drawArrays(modelo.mesh.drawMode, 0, modelo.mesh.vertexCount);
			
		}

		this.gl.bindVertexArray(null);

		return this;

	}
}
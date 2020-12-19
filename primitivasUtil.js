var Primitivas = {};

Primitivas.Grid = class {
	static createMesh(gl,c,a,tamCell){

		var vertices = [];
		var tamanhoTotal = 1.8;
		var metadeTotal = tamanhoTotal/2;
		var numDivC = c;
		var numDivA = a;
		var avanC = tamCell;
		var avanA = tamCell;

		var tempX;
		var tempY;

		if(numDivA>numDivC){
			for(var j=0; j <= numDivC; j++){
	
				tempX = -metadeTotal + (j * avanC);
				vertices.push(tempX);			
				vertices.push(metadeTotal);		
				vertices.push(0);		
				vertices.push(0);		
				vertices.push(tempX);			
				vertices.push(-metadeTotal);		
				vertices.push(0);		
				vertices.push(0);		

				if(j!==numDivC){
					for(var i=0; i <= numDivA; i++){
						
						tempY = metadeTotal - (i * avanA);
						vertices.push(tempX);		
						vertices.push(tempY);		
						vertices.push(0);		
						vertices.push(0);		
						vertices.push(tempX + avanC);		
						vertices.push(tempY);	
						vertices.push(0);		
						vertices.push(0);		
					}
				}
			}
		
		} else {

			for(var j=0; j <= numDivA; j++){
			
				tempY = metadeTotal - (j * avanA);
				vertices.push(-metadeTotal);	
				vertices.push(tempY);		
				vertices.push(0);		
				vertices.push(0);		
				vertices.push(metadeTotal);	
				vertices.push(tempY);		
				vertices.push(0);		
				vertices.push(0);		

				if(j!==numDivA){
					for(var i=0; i <= numDivC; i++){
					
						tempX = -metadeTotal + (i * avanC);
						vertices.push(tempX);		
						vertices.push(tempY);		
						vertices.push(0);		
						vertices.push(0);		
						vertices.push(tempX);		
						vertices.push(tempY - avanA);	
					    vertices.push(0);		
						vertices.push(0);		
					}
				}
			}
		}

		var posCor = 4;
		var compAvan;

		var mesh = {drawMode:gl.LINES, vao:gl.createVertexArray()};

		mesh.tamCadaVert = 4;
		mesh.vertexCount = vertices.length/mesh.tamCadaVert;
		var compAvan = Float32Array.BYTES_PER_ELEMENT*mesh.tamCadaVert;

		mesh.bufVertices = gl.createBuffer();
		gl.bindVertexArray(mesh.vao);
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(posCor);
		
		gl.vertexAttribPointer(0,3,gl.FLOAT,false,compAvan,0);
		gl.vertexAttribPointer(posCor,1,gl.FLOAT,false,compAvan,Float32Array.BYTES_PER_ELEMENT*3);

		gl.bindVertexArray(null);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
		
		gl.memoriaModelos["grid"] = mesh;
		
		return mesh;

	}
}

Primitivas.Barreiras = class {
	static createMesh(gl,verticesMapa){

		var vertices = verticesMapa;

		var posCor = 4;
		var compAvan;

		var mesh = { drawMode:gl.TRIANGLES, vao:gl.createVertexArray() };

		mesh.tamCadaVert = 4;
		mesh.vertexCount = vertices.length/mesh.tamCadaVert;
		compAvan = Float32Array.BYTES_PER_ELEMENT*mesh.tamCadaVert;

		mesh.bufVertices = gl.createBuffer();
		gl.bindVertexArray(mesh.vao);
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(posCor);
		
		gl.vertexAttribPointer(0,3,gl.FLOAT,false,compAvan,0);
		gl.vertexAttribPointer(posCor,1,gl.FLOAT,false,compAvan,Float32Array.BYTES_PER_ELEMENT*3);

		gl.bindVertexArray(null);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
		
		gl.memoriaModelos["barreiras"] = mesh;
		
		return mesh;
	}
}
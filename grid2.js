var Primitivas = {};
Primitivas.Grid = class {
	static createMesh(gl,w,h,tamCell){
		//Dynamiclly create a grid
		var verts = [],
			size = 1.8,			// W/H of the outer box of the grid, from origin we can only go 1 unit in each direction, so from left to right is 2 units max
			divW = w,
			divH = h,			// How to divide up the grid
			stepW = tamCell,
			stepH = tamCell,	// Steps between each line, just a number we increment by for each line in the grid.
			half = size / 2;	// From origin the starting position is half the size.

		var pX;	//Temp variable for position value.
		var pY;

		//console.log(divW);
		//console.log(divH);

		if(divH>divW){
			for(var j=0; j <= divW; j++){
			    //Vertical
				pX = -half + (j * stepW);
				verts.push(pX);			//x1
				verts.push(half);		//y1
				verts.push(0);		//z1
				verts.push(0);		//c1

				verts.push(pX);			//x2
				verts.push(-half);		//y2
				verts.push(0);		//z2
				verts.push(0);		//c2

				if(j!==divW){
					for(var i=0; i <= divH; i++){
						//Horizontal
						pY =  half - (i * stepH);
						verts.push(pX);		//x1
						verts.push(pY);		//y1
						verts.push(0);		//z1
						verts.push(0);		//c2

						verts.push(pX+stepW);		//x2
						verts.push(pY);	//y2
						verts.push(0);		//z2
						verts.push(0);		//c2
					}
				}
			}
		} else {

			for(var j=0; j <= divH; j++){
			//Horizontal
				pY = half - (j * stepH);
				verts.push(-half);	//x1
				verts.push(pY);		//y1
				verts.push(0);		//z1
				verts.push(0);		//c1

				verts.push(half);	//x2
				verts.push(pY);		//y2
				verts.push(0);		//z2
				verts.push(0);		//c2

				if(j!==divH){
					for(var i=0; i <= divW; i++){
					//Vertical 
						pX = -half + (i * stepW);
						verts.push(pX);		//x1
						verts.push(pY);		//y1
						verts.push(0);		//z1
						verts.push(0);		//c2

						verts.push(pX);		//x2
						verts.push(pY-stepH);	//y2
					    verts.push(0);		//z2
						verts.push(0);		//c2
					}
				}
			}
		}
		//console.log(verts);

		

		
		/*verts.push(0.02);	//x1 0.02,0.79,0.0,1.0
		verts.push(0.79);	//y1
		verts.push(0);		//z1
		verts.push(4);		//c2

		verts.push(0.48);	//x20.76,0.76,0.0,3.0,
		verts.push(0.45);	//y2
		verts.push(0);		//z2
		verts.push(4);		//c2

		verts.push(0.48);	//x1
		verts.push(0.14);	//y1
		verts.push(0);		//z1
		verts.push(4);		//c2

		verts.push(-0.02);	//x2 -0.02,-0.2,0.0,2.0,
		verts.push(-0.2);	//y2
		verts.push(0);		//z2
		verts.push(4);		//c2

		verts.push(0.48);	//x1
		verts.push(0.14);	//y1
		verts.push(0);		//z1
		verts.push(4);		//c2

		verts.push(0.48);	//x2 
		verts.push(0.45);	//y2
		verts.push(0);		//z2
		verts.push(4);      //c2
		*/


		//Setup
		var attrColorLoc = 4,
			strideLen,
			mesh = { drawMode:gl.LINES, vao:gl.createVertexArray() };

		//Do some math
		mesh.vertexComponentLen = 4;
		mesh.vertexCount = verts.length / mesh.vertexComponentLen;
		strideLen = Float32Array.BYTES_PER_ELEMENT * mesh.vertexComponentLen; //Stride Length is the Vertex Size for the buffer in Bytes

		//Setup our Buffer
		mesh.bufVertices = gl.createBuffer();
		gl.bindVertexArray(mesh.vao);
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(ATTR_POSITION_LOC);
		gl.enableVertexAttribArray(attrColorLoc);
		
		gl.vertexAttribPointer(
			ATTR_POSITION_LOC						//Attribute Location
			,3										//How big is the vector by number count
			,gl.FLOAT 								//What type of number we passing in
			,false									//Does it need to be normalized?
			,strideLen								//How big is a vertex chunk of data.
			,0										//Offset by how much
		);

		gl.vertexAttribPointer(
			attrColorLoc							//new shader has "in float a_color" as the second attrib
			,1										//This atttrib is just a single float
			,gl.FLOAT
			,false
			,strideLen								//Each vertex chunk is 4 floats long
			,Float32Array.BYTES_PER_ELEMENT * 3		//skip first 3 floats in our vertex chunk, its like str.substr(3,1) in theory.
		);

		//Cleanup and Finalize
		gl.bindVertexArray(null);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
		gl.mMeshCache["grid"] = mesh;
		return mesh;
	}
}

Primitivas.Barreiras = class {
	static createMesh(gl,verticesMapa){
		
		var verts = verticesMapa;
			
		var attrColorLoc = 4,
			strideLen,
			mesh = { drawMode:gl.TRIANGLES, vao:gl.createVertexArray() };

		//Do some math
		mesh.vertexComponentLen = 4;
		mesh.vertexCount = verts.length / mesh.vertexComponentLen;
		strideLen = Float32Array.BYTES_PER_ELEMENT * mesh.vertexComponentLen; //Stride Length is the Vertex Size for the buffer in Bytes

		//Setup our Buffer
		mesh.bufVertices = gl.createBuffer();
		gl.bindVertexArray(mesh.vao);
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(ATTR_POSITION_LOC);
		gl.enableVertexAttribArray(attrColorLoc);
		
		gl.vertexAttribPointer(
			ATTR_POSITION_LOC						//Attribute Location
			,3										//How big is the vector by number count
			,gl.FLOAT 								//What type of number we passing in
			,false									//Does it need to be normalized?
			,strideLen								//How big is a vertex chunk of data.
			,0										//Offset by how much
		);

		gl.vertexAttribPointer(
			attrColorLoc							//new shader has "in float a_color" as the second attrib
			,1										//This atttrib is just a single float
			,gl.FLOAT
			,false
			,strideLen								//Each vertex chunk is 4 floats long
			,Float32Array.BYTES_PER_ELEMENT * 3		//skip first 3 floats in our vertex chunk, its like str.substr(3,1) in theory.
		);

		//Cleanup and Finalize
		gl.bindVertexArray(null);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
		gl.mMeshCache["barreiras"] = mesh;
		return mesh;
	}
}
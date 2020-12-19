class Renderizar{
	constructor(func,fps){

		var anim = this;
		
		this.ultimoFrameMilis = null;
		this.funcion = func;
		this.estaAtivo = false;
		this.fps = 0;	
		

		if(!fps && fps > 0){
			
			this.milisPorFrame = 1000/fps; 
			
			this.run = function(){
				
				var milisDeMomento = performance.now();
				var	milisDelta = (milisDelta - anim.ultimoFrameMilis);
				var delta = milisDelta / 1000.0;		
				
				if(milisDelta>=anim.milisPorFrame){ 
				
					anim.fps= Math.floor(1/deltaTime);
					anim.ultimoFrameMilis = milisDeMomento;
					anim.funcion(delta);

				}

				if(anim.estaAtivo){ 

					window.requestAnimationFrame(anim.run);

				}
			}

		} else {

			this.run = function(){
				
				var milisDeMomento = performance.now();
				var delta = (milisDeMomento - anim.ultimoFrameMilis) / 1000.0;	

				anim.fps = Math.floor(1/delta); 

				anim.funcion(delta);

				if(anim.estaAtivo){

					window.requestAnimationFrame(anim.run);

				} 
			}
		}
	}

	iniciar(){

		this.estaAtivo = true;
		this.ultimoFrameMilis = performance.now();
		window.requestAnimationFrame(this.run);
		
		return this;

	}

	parar(){

		this.estaAtivo = false;
		
	}
}
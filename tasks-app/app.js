//Este tiene todo el código de Javascript
//console.log('Hello world!');
/*Con Esto puedo ver si está andando jquery
$(function(){
	console.log('JQuery esta funcionando')
});*/

$(document).ready(function(){

	let edit = false;
	console.log('JQuery esta funcionando');
	$('#task-result').hide();//Ocultamos el elemento card
	//capturamos el input del buscador con el id
	fetchTasks(); //Llamamos a la función definida aquí mismo para que se ejecute apenas entra

	$('#search').keyup(function(e){
		if($('#search').val()){//Si el usuario no tipeó nada que no haga la búsqueda
			let search = $('#search').val(); //Obtengo el valor de la variable search
			//para hacer peticiones ajax sin muchas lineas de codigo, jquery implementa una serie de herramientas
			$.ajax({
				//donde quiero hacer una petición
				url: 'task-search.php',
				type: 'POST',
				data:{search: search},//podemos enviar valores y objetos, sirve poner resumido solo search
				success: function(response){
					let tasks = JSON.parse(response); //Convertimos un string nuevamente a un json
					let template = '';
					
					tasks.forEach(task => {
						template += `<li>
							${task.name}
						</li>`
					});

					$('#container').html(template);//Accedo al elemento container del dom utilizando jquery
					$('#task-result').show();
				}
			});
		}
	});

	//Este método submit se encarga de guardar y o actualizar la tarea
	$('#task-form').submit(function(e){
		const postData = { //creamos un objeto para enviar los datos del formulario
			name: $('#name').val(), //tomo del campo text name
			description: $('#description').val(), //tomo del campo textarea
			id: $('#taskId').val()
		};

		let url = edit ===false ? 'task-add.php' : 'task-edit.php'; //Verifico la variable edit para saber si se tiene que guardar el elemento o actualizar, por eso envío a uno u otro archivo de proceso en el backend
		e.preventDefault();//Evita que se ejecute el comportamiento por defecto, en este caso, submit refresca la página por que ejecuta el metodo post o get, lo evitamos con esto
		
		$.post(url, postData, function(response) { //método abreviado para enviar datos y recibir la respuesta del server
			fetchTasks();

			if(edit)//Si se intentó editar, se resetea la variable para cuando el usuario desee guardar 
				edit = false;

			$('#task-form').trigger('reset'); //Reseteamos el formulario para que limpie los controles
			
		});
	});

	function fetchTasks(){
		$.ajax({ 
			url: 'task-list.php',
			type: 'GET',
			success: function (response){
				let tasks = JSON.parse(response);
				let template = '';
				tasks.forEach(task => {
					template += `
						<tr taskId="${task.id}">
							<td>${task.id}</td>
							<td>
								<a href="#" class="task-item">${task.name}</a>
							</td>
							<td>${task.description}</td>
							<td>
								<button class = "task-delete btn btn-danger">
									Delete
								</button>
							</td>
						</tr>
					`
				})
				$('#tasks').html(template); //Utilizamos el elemento del id del tbody y modificamos en el dom
	
			}
		});
	}
	//En mi documento vamos a escuchar el evento click pero solo de los que 
	//tengan la clase task-delete
	$(document).on('click', '.task-delete', function(){
		/*Otra forma habiendo creado un atributo al row y accediendolo
		let element2 = $(this)[0].parentElement.parentElement;
		let id2 = $(element2).attr('taskId');
		*/
		if(confirm('Are you sure you want to delete it?')){
			let element = $(this)[0].parentElement.parentElement.cells[0].innerHTML;
			let id = element;
			$.post('task-delete.php', {id}, function(response){
			fetchTasks();
			});
		}
		
	}); 

	//Evento para editar, y vamos a manejarlo con una función
	$(document).on('click', '.task-item', function(){
		let element = $(this)[0].parentElement.parentElement;
		let id = $(element).attr('taskId');
		$.post('task-single.php', {id}, function(response){
			const task = JSON.parse(response);
			$('#taskId').val(task.id);
			$('#name').val(task.name);//Accedo al elemento con el id #name del dom
			$('#description').val(task.description);
			edit = true;
		})
		

	})
});
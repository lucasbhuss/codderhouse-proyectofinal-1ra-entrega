// MENSAJES

let msjSelected = "Elija el plan que desea contratar:\n[1] Personal: $469,99\n[2] Básico: $895,99\n[3] Avanzado: $1390,99\n[4] Profesional: $1979,99"
let errorMsj = "Alguno de los ingresados es incorrecto";
let userSelectedMsj = "Selecionaste el plan: ";
let userSelectedMsj2 = "Precio final por mes: ";
let msjAdicional = "¿Desea añadir un servicio adicional? (Digite un número)\n[1] Soporte en línea 24/7: $495.99\n[2] Almacenamiento adicional de 50gb: $390.99\n[3] Ancho de banda ilimitado: $359.99";

// Servicios

class Servicios {
    constructor(id , nombre, precio) {
        this.id = Number(id),
        this.nombre = nombre,
        this.precio = Number(precio)
    }
}

const servicios = [];

servicios.push(new Servicios(1, "Personal", 469.99));
servicios.push(new Servicios(2, "Basico", 895.99));
servicios.push(new Servicios(3, "Avanzado", 1390.99));
servicios.push(new Servicios(4, "Profesional", 1979.99));


class ServicioAdicional {
    constructor(id, nombre, precio) {
        this.id = Number(id),
        this.nombre = nombre,
        this.precio = Number(precio)
    }
}

const serviciosAdicionales = [];

serviciosAdicionales.push(new ServicioAdicional(1, "Soporte en línea 24/7", 495.99));
serviciosAdicionales.push(new ServicioAdicional(2, "Almacenamiento adicional de 50gb", 390.99));
serviciosAdicionales.push(new ServicioAdicional(3, "Ancho de banda ilimitado", 359.99));


// Datos del cliente

class DatosClientes {
    constructor(nombreCompleto, celular, mail, cuilCuit) {
        this.nombreCompleto = nombreCompleto,
        this.celular = parseInt(celular),
        this.mail = mail,
        this.cuilCuit = cuilCuit
    }
}

// Funcion para seleccionar un plan

let total = 0;
let precio = 0;
let otraVez;



const seleccionarPlan = () => {
    let totalServiciosContratados = 0;
    let precioUnitario = 0;
    let servicioSeleccionado = Number((prompt(msjSelected)))

    let serv = servicios.find(item => item.id == servicioSeleccionado);
    if (serv){
        alert("Usted solicito "+ serv.nombre+"\n"+"Costo por mes: "+serv.precio)
        precioUnitario = serv.precio
    }
    else alert(errorMsj)  
    
totalServiciosContratados = totalServiciosContratados + precioUnitario
return totalServiciosContratados;
};

// Servicio Adicional

const agregarServicioAdicional = (montoServicios) => {
    let montoFinalServicios = montoServicios; 
    let agregarOtroServicioAdicional;
    let totalServiciosAdicionalesContratados = 0;
    let precioUnitario = 0;

    do {
        let servicioAdicional = parseInt(prompt(msjAdicional))
        let serv = serviciosAdicionales.find(item => item.id == servicioAdicional);
        if (serv){
            alert("Usted agrego "+ serv.nombre+"\n"+"Costo extra por mes: "+serv.precio)
                precioUnitario = serv.precio      
        }
        else {
            alert(errorMsj);
        }
    agregarOtroServicioAdicional = confirm("Agregar otro?")

    } while (agregarOtroServicioAdicional);

    totalServiciosAdicionalesContratados = montoFinalServicios + precioUnitario;
    return totalServiciosAdicionalesContratados;
};



// Facturación Cliente


const facturacionCliente = () => {

    const datosFacturacionClientes = [];

    const nombreCliente = prompt("Ingrese su nombre completo:");
    const celularCliente = parseInt(prompt("Ingrese un número de celular:"));
    const mailCliente = prompt("Ingrese un correo electronico:");
    const cuilCuit = parseInt(prompt("Ingrese su CUIT/CUIL"));

    datosFacturacionClientes.push(new DatosClientes(nombreCliente, celularCliente, mailCliente, cuilCuit))

    return datosFacturacionClientes;
}


// Calculo de Cuotas

let cuotas = 0;

function calcularCuotas(monto){
    let totalCuota = 0;
    let cantidadCuotas;
    let interes = 0.10;

    let confirmacionCuotas = confirm("Desea pagar en cuotas?")

    if (confirmacionCuotas) {
        do {
            cantidadCuotas = parseInt(prompt("En cuantas cuotas quiere abonar? 3, 6 o 12"));
        } while (!(cantidadCuotas == 3 || cantidadCuotas == 6 || cantidadCuotas == 12))
    } else {
        cantidadCuotas = 1;
        interes = 0;
    }

    totalCuota = monto/cantidadCuotas
    let detalleCuotas = "";

   
    for(let n = 0; n < cantidadCuotas; n++) {
        totalCuota = totalCuota * (1+interes);
        detalleCuotas += "Cuota "+ parseInt(n+1) +": "+"ARS$"+ totalCuota.toFixed(2) +"\n";
    }
    return detalleCuotas;
}



// Finalización de compra

function finalizarCompra(detalle){
    alert("Monto de pago final:"+"\n"+detalle)
    alert("Compra finalizada con éxito! Revise su correo electronico para acceder al servicio.")
}




let montoServicios = seleccionarPlan();
let montoNeto = agregarServicioAdicional(montoServicios);
facturacionCliente();
let finalCuotas = calcularCuotas(montoNeto)
finalizarCompra(finalCuotas)
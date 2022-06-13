// Variables Globales
const nombre = document.getElementById("name");
const apellido = document.getElementById("lastName");
const email = document.getElementById("email");



let g_precioPlan
let g_mesesContrato = [1, 3, 6, 12]
let g_descuentoMesesContrato = [0, 5, 7, 10]
const servicios = [];
const g_serviciosAdicionales = [];
const facturacionClientes = [];


// Constructores de objetos

class Servicios {
    constructor(id , nombre, precio) {
        this.id = Number(id),
        this.nombre = nombre,
        this.precio = Number(precio)
    };
};

class ServicioAdicional {
    constructor(id, nombre, precio) {
        this.id = Number(id),
        this.nombre = nombre,
        this.precio = Number(precio)
    };
};


// Servicios

servicios.push(new Servicios(1, "Personal", 469.99));
servicios.push(new Servicios(2, "Basico", 895.99));
servicios.push(new Servicios(3, "Avanzado", 1390.99));
servicios.push(new Servicios(4, "Profesional", 1979.99));

g_serviciosAdicionales.push(new ServicioAdicional(1, "Ninguno", 0));
g_serviciosAdicionales.push(new ServicioAdicional(2, "Soporte en línea 24/7", 495.99));
g_serviciosAdicionales.push(new ServicioAdicional(3, "Almacenamiento adicional de 50gb", 390.99));
g_serviciosAdicionales.push(new ServicioAdicional(4, "Ancho de banda ilimitado", 359.99));



// Inicio

window.onload = function() {

// EVENTOS

    let botonFinalizarCompra = document.getElementById("finalizarCompra");
    botonFinalizarCompra.addEventListener("click", finalizarCompra)

    let btn_contratar = document.getElementsByClassName("btn-contratar")
    if (btn_contratar) {
        Array.prototype.forEach.call(btn_contratar, function(btn) {
            btn.addEventListener("click", function() {
                g_precioPlan = muestroPlan(btn.value)
                mostrarVentanaPago()
            })
        });

    };

    let cbo_cuotas = document.getElementById("cuotas")
    if (cbo_cuotas) {
        cbo_cuotas.addEventListener("change",  function() { 
            let ind = g_mesesContrato.indexOf(parseInt(cbo_cuotas.value))
            let obtenerDescuento = (g_precioPlan*g_descuentoMesesContrato[ind]/100).toFixed(2)
            let precioDescuentoAplicado = ((g_precioPlan)-obtenerDescuento).toFixed(2)


            let descuentoAplicado = document.getElementById("display-meses")
            if (descuentoAplicado){
                descuentoAplicado.innerHTML = "Tienes un descuento del "+g_descuentoMesesContrato[ind]+"%! El total por mes es de $"+precioDescuentoAplicado
            }
        })
    }
    cargarMesesServicio()
    cargarServicioAdicional()
};


let display_adicional = document.getElementById("adicional")
    if (display_adicional) {
        display_adicional.addEventListener("change", function() {
        let servSelected = g_serviciosAdicionales.find(item => item.id == display_adicional.value);
        let displayServicioAdicionalPrecio = document.getElementById("display-adicional")
        if (displayServicioAdicionalPrecio){
            displayServicioAdicionalPrecio.innerHTML = "Costo adicional por mes $"+ servSelected.precio
        };
    });
};


// Elementos

function cargarMesesServicio() {
    let cbo_cuotas = document.getElementById("cuotas")
    if (cbo_cuotas) {
    
        for(let i = 0; i < g_mesesContrato.length; i++) {
            let option1 = document.createElement("option");
            option1.setAttribute("value", g_mesesContrato[i]);
            let option1Texto = document.createTextNode(g_mesesContrato[i] + " mes/es");
            option1.appendChild(option1Texto);
            cbo_cuotas.appendChild(option1);
        };
    };    
};

function cargarServicioAdicional() {
    let display_adicional = document.getElementById("adicional")
    if (display_adicional) {
    
        for(let i = 0; i < g_serviciosAdicionales.length; i++) {
            let option1 = document.createElement("option");
            option1.setAttribute("value", g_serviciosAdicionales[i].id);
            let option1Texto = document.createTextNode(g_serviciosAdicionales[i].nombre);
            option1.appendChild(option1Texto);
            display_adicional.appendChild(option1);
        };
    };
};


// Mostrar ventanas de pago y ocultar planes

function mostrarVentanaPago() {
    document.getElementById("payment").style.display = "block";
    document.getElementById("plan-info").style.display = "none";
};

// Funciones para comprar

function muestroPlan(planId){
    let servSelected = servicios.find(item => item.id == planId);
    let servicePrice = servSelected.precio

    let contenedorPlan = document.createElement("div")
    contenedorPlan.innerHTML = `<div class="contenedorPlan">
                               <h3>Seleccionaste el plan ${servSelected.nombre}!</h3>
                               <p>Costo final por mes: $${servSelected.precio}</p>
                               </div>`
    let datosplan = document.getElementById("datos_plan")
    if (datosplan)
        datosplan.appendChild(contenedorPlan)
    return servicePrice
};

// Finalizar pago

function finalizarCompra(){
    alert("Finalizaste tu compra con éxito! Revisá el correo electronico para acceder a tu servicio.")
};











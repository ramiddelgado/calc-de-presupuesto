function calcularPresupuesto() {
  // Obtener los valores ingresados por el usuario
  const numDias = parseInt(document.getElementById("numDias").value);
  const horasDiarias = parseInt(document.getElementById("horasDiarias").value);
  const necesitaUber = document.getElementById("necesitaUber").value;
  const hayDescuento = document.getElementById("hayDescuento").value;
  const montoDescuento = document.getElementById("montoDescuento").value;
  const zona = document.getElementById("zona");
  const zonaTexto = zona.options[zona.selectedIndex].text;
  //   const tipoServicio = document.getElementById("tipoServicio").value;

  // Definir las tarifas base
  let tarifaBase = 0;
  let tarifaPorHora = 7000;
  //   let multiplicadorServicio = 1; // Multiplicador por defecto para servicio básico

  // Ajustar el multiplicador según el tipo de servicio seleccionado
  //   switch (tipoServicio) {
  //     case "estandar":
  //       multiplicadorServicio = 1.2; // 20% más que el servicio básico
  //       break;
  //     case "premium":
  //       multiplicadorServicio = 1.5; // 50% más que el servicio básico
  //       break;
  //   }

  // Calcular el costo base
  let costoBase = tarifaBase + tarifaPorHora * horasDiarias;

  // Multiplicar por el número de días
  let costoTotal = costoBase * numDias;

  // Agregar costo adicional si necesita Uber
  if (necesitaUber === "si") {
    costoTotal += calcularCostoZona() * numDias;
  }

  // Agregar descuento si hay descuento
  if (hayDescuento === "si") {
    costoTotal -= costoTotal * calcularDescuento();
  }

  // Mostrar el resultado en el HTML
  let zonaInfo =
    necesitaUber === "si" ? ` en la zona de <strong>${zonaTexto}</strong>` : "";
  let descuentoInfo =
    hayDescuento === "si"
      ? ` con un descuento del <strong>${montoDescuento}%</strong>`
      : "";

  document.getElementById("resultado").innerHTML = `
          <h2>Presupuesto Estimado</h2>
          <p>El costo total por <strong>${horasDiarias} hora(s) diaria(s)</strong> durante <strong>${numDias} día(s)</strong>${descuentoInfo}${zonaInfo} es: $<strong>${costoTotal.toFixed(
    0
  )}.</strong></p>
      `;
}

// ?FUNCION PARA MOSTRAR LA ZONA
function mostrarZona() {
  let necesitaUber = document.getElementById("necesitaUber");
  let zonaDiv = document.getElementById("zonaDiv");
  if (necesitaUber.value === "si") {
    zonaDiv.style.display = "block";
  } else {
    zonaDiv.style.display = "none";
  }
}

// ?FUNCION PARA MOSTRAR LA ZONA Y CALCULAR COSTO ADICIONAL
function calcularCostoZona() {
  let zona = document.getElementById("zona").value;
  let costoAdicional = 0;

  switch (zona) {
    case "generalPaz":
    case "alberdi":
    case "barrioJardin":
    case "centro":
      costoAdicional = 5000;
      break;
    case "cofico":
      costoAdicional = 6000;
      break;
    case "cerroLasRosas":
    case "otro":
      costoAdicional = 8000;
      break;
  }

  return costoAdicional;
}

// Función para calcular el descuento
function calcularDescuento() {
  let montoDescuento = document.getElementById("montoDescuento").value;
  let descuento = 0;

  switch (montoDescuento) {
    case "5":
      descuento = 0.05;
      break;
    case "10":
      descuento = 0.1;
      break;
    case "15":
      descuento = 0.15;
      break;
    case "20":
      descuento = 0.2;
      break;
    case "25":
      descuento = 0.25;
      break;
  }

  return descuento;
}

// ?FUNCION PARA MOSTRAR EL MONTO DE DESCUENTO
function mostrarMontoDescuento() {
  let hayDescuento = document.getElementById("hayDescuento");
  let montoDescuentoDiv = document.getElementById("montoDescuentoDiv");
  if (hayDescuento.value === "si") {
    montoDescuentoDiv.style.display = "block";
  } else {
    montoDescuentoDiv.style.display = "none";
  }
}

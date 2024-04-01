<template>
    
    <div class="MetodosContainer">
				<h1 class="MetodosHeaderContainer">Agregar metodos de pago</h1>
				<div class="MetodosInput">
					<div class="MetodoMetododPago">
                        <inputMetodosPago 
                        :valorMetodoPago="setMetodoPago"
                        :valorBanco="setBanco"
						/>
                    </div>
					<div class="MetodoMonto-BotonAgregar">
						<div class="MetodoMonto">
							<InputDiferente name="Monto:" color="#D9D9D9" width="15%" onChange={setMonto} value='' />
						</div>
						<div class="MetodoBotonAgregar">
							<BtnGeneral :img="svgAdd" text="Agregar Pago" width="165px" />
						</div>
					</div>
				</div>

				<div class="MetodosPagoTableContainer">
					
				</div>

				<div class="MetodosCheckoutContainer">
					
					<BtnGeneral text="Checkout"
						width="140px"
						color="#ff6060"
						onHoverColor="#c54444"
						img={marketCartSVG} />
					
				</div>
			</div>
  </template>
  
  <script>
import InputDiferente from '../../inputs/InputDiferente.vue';
import InputMetodosPago from '../../inputs/InputMetodosPago.vue'; 
import BtnGeneral from '../../buttons/BtnGeneral.vue'; 


  export default {
    components: {
      InputMetodosPago, InputDiferente, BtnGeneral
    },
    methods: {
      handleValorMetodoPago(valor) {
        console.log('Valor del método de pago seleccionado:', valor);
        // Aquí puedes realizar cualquier acción necesaria con el valor del método de pago seleccionado
      },
      handleValorBanco(valor) {
        console.log('Valor del banco seleccionado:', valor);
        // Aquí puedes realizar cualquier acción necesaria con el valor del banco seleccionado
      }
    }
  };

  
  </script>
  
  <style scoped>
  .MetodosContainer {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 85vh;
	background-color: #ffff;
	position: relative;
}

.MetodosHeaderContainer {
	flex-basis: 10%;
	margin-left: 7%;
	align-items: center;
	display: flex;
}

.MetodosInput {
	display: flex;
	flex-direction: column;
	gap: 20px;
   
}

.MetodoMetododPago {
	margin-left: 10%;
	align-items: center;
	display: flex;
	flex-direction: row;
	gap: 25px;
}

.MetodoMonto-BotonAgregar {
	display: flex;
	flex-direction: column;
	margin-left: 10%;
	gap: 20px;
}

.MetodosPagoTableContainer {
	width: 60%;
	display: flex;
	align-self: center;
	justify-content: center;
	flex-basis: 50%;
}

.MetodosCheckoutContainer {
	align-self: normal;
	flex-basis: 15%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 30px;
	margin-left: auto;
	margin-right: 10%;
}


  </style>
  
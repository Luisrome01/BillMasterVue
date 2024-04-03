<template>
    <div class="modalContainer">
        <div class="modalBackgroundBlur"></div>
        <div class="modalContent">
            <div class="title">
                <h1>Resumen del cierre de caja</h1>
                <BtnGeneral text="X" gap="0" width="40px" height="40px" color="#FF6060" bgColor="#FF0000" @click="closeModal" />
            </div>
            <div class="body">
                <div class="bodyContainer">
                    <p>Responsable: {{ responsable }}</p>
                    <div class="FechaHora">
                        <p>Fecha: {{ fecha }}</p>
                        <p>Hora: {{ hora }}</p>
                    </div>
                    <p class="Estadistica">Estadística</p>
                    <p>Facturas realizadas: {{ cantidadFacturas }}</p>
                    <p>Saldo de cierre: ${{ total }}</p>
                    <p>Ingresos: ${{ ingresos }}</p>
                    <p>Egresos: ${{ egresos }}</p>
                </div>
            </div>
            <div class="footer">
                <div class="footerContainer">
                    <img src="../../assets/check.svg" alt="Check" />
                    <h4>
                        El saldo de cierre concuerda con los ingresos y egresos de las transacciones.
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BtnGeneral from "../buttons/BtnGeneral.vue";

export default {
    components: {
        BtnGeneral
    },
    props: {
        ingresos: {
            type: String,
            required: true
        },
        egresos: {
            type: String,
            required: true
        },
        total: {
            type: String,
            required: true
        },
        cantidadFacturas: {
            type: Number,
            required: true
        },
        responsable: {
            type: String,
            required: true
        },
        fecha: {
            type: String,
            required: true
        },
        hora: {
            type: String,
            required: true
        },
        closeModal: {
            type: Function,
            required: true
        }
    }
};
</script>

<style>
@font-face {
    font-family: "SF Pro Display Bold";
    src: url("../../assets/fonts/sf-pro-display-bold.OTF") format("opentype");
}

.modalContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modalBackgroundBlur {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    z-index: 1;
}

.modalContent {
    position: relative;
    z-index: 2;
    background-color: white;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 25px;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bodyContainer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 20px;
}

.FechaHora {
    display: flex;
    flex-direction: row;
    gap: 40px;
}

.modalContainer .footer {
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.footerContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 25px;
}

.Estadistica {
    font-family: "SF Pro Display Bold", sans-serif;
}

p, h1, h2, h3, h4 {
    margin: 0;
    padding: 0;
}
</style>
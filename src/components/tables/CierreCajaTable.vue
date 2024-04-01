<template>
    <div :style="style" class="cierreCajaTableContainer">
        <div class="cierreCajaTableWrapper">
            <div class="cierreCajaTableHeader">
                <p>Número de factura</p>
                <p>Fecha</p>
                <p>Monto</p>
                <p>Ingresos</p>
                <p>Egresos</p>
            </div>
            <div class="cierreCajaTableBody">
                <div v-for="(fila, index) in data" :key="index" class="cierreCajaTableRow">
                    <p>{{ fila.id }}</p>
                    <p>{{ fila.date }}</p>
                    <p>{{ fila.monto }}</p>
                    <p>{{ fila.ingresos }}</p>
                    <p>{{ fila.egresos }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: "90%"
        },
        height: {
            type: String,
            default: "85%"
        },
        color: {
            type: String,
            default: "#ffffff"
        },
        data: {
            type: Array,
            required: true
        }
    },
    computed: {
        style() {
            return {
                width: this.width,
                height: this.height,
                backgroundColor: this.color
            };
        }
    }
};
</script>

<style>
@font-face {
	font-family: "SF Pro Display Bold";
	src: url("../../assets/fonts/sf-pro-display-bold.OTF") format("opentype");
}

.cierreCajaTableContainer {
	align-self: center;
	border: 1.42917px solid #000000;
	box-sizing: border-box;
	box-shadow: 3.81111px 5.71667px 0px #000000;
	border-radius: 22.8667px;
}

.cierreCajaTableWrapper {
	display: flex;
	flex-direction: column;
	height: 35vh;
}

.cierreCajaTableHeader {
	display: grid;
	align-items: center;
	justify-items: center;
	grid-template-columns: repeat(5, 1fr);
	padding: 15px;
	padding-right: 25px;
	background-color: #d6d6d6;
	border-radius: 22.8667px 22.8667px 0px 0px;
}

.cierreCajaTableBody {
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	height: 100%;
	margin-right: 10px;
}

.cierreCajaTableRow {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	align-items: center;
	justify-items: center;
	margin-top: 25px;
}

.cierreCajaTableHeader p {
	font-size: 15px;
	font-family: "SF Pro Display Bold", sans-serif;
}

.cierreCajaTableRow p {
	font-size: 15px;
}

.cierreCajaTableBody::-webkit-scrollbar {
	width: 6px;
	background-color: #f5f5f5;
}

.cierreCajaTableBody::-webkit-scrollbar-thumb {
	background-color: #888;
	border-radius: 3px;
}

.cierreCajaTableBody::-webkit-scrollbar-thumb:hover {
	background-color: #555;
}

.cierreCajaTableBody::-webkit-scrollbar-track {
	background-color: #dadada;
	border-radius: 3px;
}

.cierreCajaTableBody::-webkit-scrollbar-track:hover {
	background-color: #f1f1f1;
}

p {
    margin: 0;
    padding: 0;
}
</style>
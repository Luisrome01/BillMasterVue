<template>
    <nav class="NavNavbar">
        <div class="NavLogo">
            <img :src="logo" alt="logo">
            <h1 class="NavBarTitle">Bill Master</h1>
        </div>
        <div class="NavContent">
            <h2 style="color: #A4A4A5;">MENU PRINCIPAL</h2>
            <div class="nav-link" @click="setComponenteActivo('Productos')" :style="getStyle('Productos')"
                @mouseenter="handleMouseEnter('Productos')" @mouseleave="handleMouseLeave('Productos')">
                <!-- SVG y Texto para Productos aquí -->
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="nav-link-img">
                    <!-- Tus paths aquí -->
                </svg>
                <h3 :style="{ color: componenteActivo === 'Productos' ? activeLogoColor : baseLogoColor }">Productos
                </h3>
            </div>
            <div class="nav-link" @click="setComponenteActivo('Facturación')" :style="getStyle('Facturación')"
                @mouseenter="handleMouseEnter('Facturación')" @mouseleave="handleMouseLeave('Facturación')">
                <!-- SVG y Texto para Productos aquí -->
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="nav-link-img">
                    <!-- Tus paths aquí -->
                </svg>
                <h3 :style="{ color: componenteActivo === 'Facturación' ? activeLogoColor : baseLogoColor }">Facturación
                </h3>
            </div>
            <div class="nav-link" @click="setComponenteActivo('Métodos de Pago')" :style="getStyle('Métodos de Pago')"
                @mouseenter="handleMouseEnter('Métodos de Pago')" @mouseleave="handleMouseLeave('Métodos de Pago')">
                <!-- SVG y Texto para Métodos de Pago aquí -->
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="nav-link-img">
                    <!-- Tus paths aquí -->
                </svg>
                <h3 :style="{ color: componenteActivo === 'Métodos de Pago' ? activeLogoColor : baseLogoColor }">Métodos de Pago
                </h3>
            </div>
            <div class="nav-link" @click="setComponenteActivo('Cierre de Caja')" :style="getStyle('Cierre de Caja')"
                @mouseenter="handleMouseEnter('Cierre de Caja')" @mouseleave="handleMouseLeave('Cierre de Caja')">
                <!-- SVG y Texto para Cierre de Caja aquí -->
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="nav-link-img">
                    <!-- Tus paths aquí -->
                </svg>
                <h3 :style="{ color: componenteActivo === 'Cierre de Caja' ? activeLogoColor : baseLogoColor }">Cierre de Caja
                </h3>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';


export default {
    props: ['componenteActivo', 'setComponenteActivo'],
    setup(props) {
        const baseLogoColor = "#A4A4A5";
        const activeLogoColor = "#000000";
        const logo = import('../../assets/BillMasterLogo.svg'); // Asegúrate de que webpack pueda manejar esto, o usa un import estático en la parte superior.

        const componenteHover = reactive({
            Productos: false,
            Facturacion: false,
            "Metodos de Pago": false,
            "Cierre de Caja": false,
        });

        function handleMouseEnter(componente) {
            componenteHover[componente] = true;
        }

        function handleMouseLeave(componente) {
            componenteHover[componente] = false;
        }

        function getStyle(componente) {
            if (props.componenteActivo === componente) {
                return {
                    backgroundColor: "#AEBBFD",
                    boxShadow: "5px 5px 1px rgba(0, 0, 0, 1)",
                };
            } else if (componenteHover[componente]) {
                return {
                    backgroundColor: "lightGray",
                };
            }
            return {};
        }

        return {
            baseLogoColor,
            activeLogoColor,
            logo,
            handleMouseEnter,
            handleMouseLeave,
            getStyle,
        };
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.NavNavbar {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.NavLogo {
    flex-basis: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    border-bottom: 2px solid #ebebeb;
}

.NavContent {
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 80%;
    gap: 40px;
    position: relative;
}

.nav-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.nav-link-img {
    width: 30px;
    height: 30px;
    margin-left: 15px;
    margin-right: 15px;
}

.nav-link {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    border-radius: 10px;
    width: 80%;
    transition: 0.5s;
}

.nav-last-link {
    margin-top: auto;
    margin-left: 50px;
    margin-bottom: 50px;
    cursor: pointer;
}

.NavBarTitle {
    color: black;
}
</style>
<template>
    <div>
        <button :style="btnStyle" @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
            @mousedown="handlePress" @mouseup="handleRelease" class="BtnGeneral">
            <img :src="img" />
            {{ text }}
        </button>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    props: {
        text: String,
        handleClick: Function,
        width: {
            type: String,
            default: '110px'
        },
        height: {
            type: String,
            default: '46px'
        },
        color: {
            type: String,
            default: '#AEBBFD'
        },
        onHoverColor: String,
        borderRadius: {
            type: String,
            default: '11.4167px'
        },
        img: String,
        shadow: {
            type: String,
            default: '1.90278px 3.80556px 0px #000000'
        }
    },
    setup(props) {
        const isHovered = ref(false);
        const isPressed = ref(false);

        const handleMouseEnter = () => {
            isHovered.value = true;
        };

        const handleMouseLeave = () => {
            isHovered.value = false;
            if (isPressed.value) {
                isPressed.value = false;
            }
        };

        const handlePress = () => {
            isPressed.value = true;
        };

        const handleRelease = () => {
            isPressed.value = false;
        };

        const btnStyle = computed(() => ({
            width: props.width,
            height: props.height,
            backgroundColor: isHovered.value ? (props.onHoverColor || '#8E9BFF') : props.color,
            borderRadius: props.borderRadius,
            boxShadow: isPressed.value ? '0px 2px 2px rgba(0, 0, 0, 0.75)' : props.shadow,
            transition: 'background-color 0.3s, transform 0.1s, box-shadow 0.1s',
            transform: isPressed.value ? 'scale(0.95)' : 'scale(1)',
            cursor: isHovered.value ? 'pointer' : 'default'
        }));

        return {
            isHovered,
            isPressed,
            handleMouseEnter,
            handleMouseLeave,
            handlePress,
            handleRelease,
            btnStyle
        };
    }
};
</script>

<style scoped>
.BtnGeneral {
    box-shadow: 1.90278px 3.80556px 0px #000000;
    border-radius: 11.4167px;
    border: none;
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 10px;
    color: black;
    font-weight: bold;
}
</style>

<template>
    <div v-if="visible" :class="['MessageBar_Container', getPositionClass(), severity]">
        <div class="MessageBar_Text">{{ text }}</div>
    </div>
</template>

<script>
export default {
    props: {
        text: String,
        showTime: Number,
        position: String,
        severity: String
    },
    data() {
        return {
            visible: true
        };
    },
    mounted() {
        setTimeout(() => {
            this.visible = false;
        }, this.showTime);
    },
    methods: {
        getPositionClass() {
            switch (this.position) {
                case "left":
                    return "MessageBar_PositionLeft";
                case "center":
                    return "MessageBar_PositionCenter";
                case "right":
                    return "MessageBar_PositionRight";
                default:
                    return "";
            }
        }
    }
};
</script>

<style>
.MessageBar_Container {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    z-index: 9999;
}

.MessageBar_PositionLeft {
    left: 20px;
    transform: translateX(0);
}

.MessageBar_PositionCenter {
    left: 50%;
    transform: translateX(-50%);
}

.MessageBar_PositionRight {
    right: 20px;
    left: auto;
    transform: translateX(0);
}

.error {
    background-color: #ff3333;
}

.warning {
    background-color: #ffcc00;
}

.success {
    background-color: #33cc33;
}

.info {
    background-color: #3399ff;
}
</style>
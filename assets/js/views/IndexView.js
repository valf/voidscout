define("IndexView", ["backbone", "underscore"], function (Backbone, _) {
    "use strict";
    return Backbone.View.extend({
        el: ".index-view",
        initialize: function () {
            _.bindAll(this, "toggleAutoAttack", "onAutoAttackStart", "onAutoAttackEnd");
            this.model.on("autoAttack:start", this.onAutoAttackStart);
            this.model.on("autoAttack:end", this.onAutoAttackEnd); // current auto attack cooled down
            this.model.on("autoAttack:stop", this.onAutoAttackStop); // no pending auto attack
        },
        events: {
            "click .auto-attack-toggle": "toggleAutoAttack"
        },
        onAutoAttackStart: function () {
            var attack_cooldown_node = this.el.querySelector(".attack_cooldown"),
                attack_cooldown_text_node = this.el.querySelector(".attack_cooldown_text");
            attack_cooldown_node.classList.add("animate");
            attack_cooldown_node.style.width = "0px";
            this.cooldownTextUpdateInterval = setInterval(function () {
                var width = parseInt(attack_cooldown_node.offsetWidth, 10);
                attack_cooldown_text_node.textContent = (width / 400 * 4).toFixed(1) + " s";
            }, 50);
        },
        onAutoAttackEnd: function () {
            var attack_cooldown_node = this.el.querySelector(".attack_cooldown");
            attack_cooldown_node.classList.remove("animate");
            attack_cooldown_node.style.width = "400px";
            (function () { return attack_cooldown_node.offsetHeight; }()); // trigger a reflow to reset CSS animation
        },
        onAutoAttackStop: function () {
            clearInterval(this.cooldownTextUpdateInterval);
        },
        startAutoAttack: function () {
            this.el.querySelector(".auto-attack-toggle").innerHTML = "Stop Auto Attack";
            this.model.startAutoAttack();
        },
        stopAutoAttack: function () {
            window.clearInterval(this.cooldownTextUpdateInterval);
            this.el.querySelector(".auto-attack-toggle").innerHTML = "Start Auto Attack";
            this.model.stopAutoAttack();
        },
        toggleAutoAttack: function () {
            if (this.model.get("autoAttack") === true) {
                this.stopAutoAttack();
            } else {
                this.startAutoAttack();
            }
        }
    });
});
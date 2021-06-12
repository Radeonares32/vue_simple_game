new Vue({
    el: '#app',
    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false,
        events : {
            player_attack : 10,
            specail_attack : 20,
            heal_up : 20,
            monster_attack : 15
        },
        texts:{
           player_text: "Oyuncu şu kadar vurdu ",
           special_text :  "Oyuncu özel saldırı yaptı piç ",
           heal_text :  "Pezevenk can bastı ",
           montser_text : "Kral vurdu"
        },
        logs: []
    },
    methods: {
        start_game: function() {
            this.game_is_on = true;
        },
        attack: function() {
            var point = Math.ceil(Math.random() * this.events.player_attack);
            this.monster_heal -= point;
            this.game_log({ turn: 'p', text: this.texts.player_text  + " " + point });
            this.monster_attack();
        },
        special_attack: function() {
            var point = Math.ceil(Math.random() * this.events.specail_attack);
            this.monster_heal -= point;
            this.game_log({ turn: 'p', text:this.texts.special_text  + " " + point});
            this.monster_attack();
        },
        heal_up: function() {
            var point = Math.ceil(Math.random() * this.events.heal_up);
            this.player_heal += point;
            this.game_log({ turn: 'p', text: this.texts.heal_text + " " + point });
            this.monster_attack();
        },
        give_up: function() {
            this.player_heal = 0;
            this.game_log({ turn: 'p', text: "Pes etti salak bir basit koda " });
        },
        monster_attack: function() {
            var point = Math.ceil(Math.random() * this.events.monster_attack);
            this.player_heal -= point;
            this.game_log({ turn: 'm', text: this.texts.montser_text  + " " + point });
        },
        game_log: function(logs) {
            this.logs.push(logs);
        }
    },
    watch: {
        player_heal: function(value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("Oyunu Kaybetin zavalı yendien başlamak ister misin ?")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.player_heal = 100;
            }
        },
        monster_heal: function(value) {
            if (value <= 0) {
                this.monster_heal = 0;
                if (confirm("AMK Seni oyunu kazandın yendien başlamak ister misin ?")) {
                    this.monster_heal = 100;
                    this.player_heal = 100;
                    this.logs = [];
                }
            }
        }
    },
    computed: {
        player_progress : function () {
            return {
                width: this.player_heal  + "%"
            }
        },
        monster_progress : function () {
            return {
                width: this.monster_heal  + "%"
            }
        }
    }
});
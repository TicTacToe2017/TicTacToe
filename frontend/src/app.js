(function() {

	$(function() {

		var Tic;

		Tic = {
			data: {
				turns: 0,
				x: {},
				o: {},
				gameOver: false
			},

			initialize: function() {
				this.data.gameOver = false;
				//this.setPlayerNames();				
				this.assignRoles();
				this.prepareBoard();
				this.updateNotifications();
				return this.addListeners();
			},

			setPlayerNames: function() {
                
				this.data.playerX = $("input[name='player-x']").val();
                return this.data.playerO = $("input[name='player-o']").val();
                
			},

            retrieveStats: function() {

                var that = this;

                var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "http://localhost:3000/users/" + this.data.playerX,
                    "method": "GET",
                    "processData": false                
                }

                $.ajax(settings).done(function (data) {
                    that.data.playerXStats = { wins: data.winnings, loses: data.played }

                    var settings = {
                        "async": false,
                        "crossDomain": true,
                        "url": "http://localhost:3000/users/" + that.data.playerO,
                        "method": "GET",
                        "processData": false                
                    }

                    $.ajax(settings).done(function (data) {
                        that.data.playerOStats = { wins: data.winnings, loses: data.played }
                        return true;
                    });

                });            
            },

            getPlayerName: function(symbol) {
				var name;
				name = this.data.rolePlayerX === symbol ? this.data.playerX : this.data.playerO;
                return name;
			},

            prepareBoard: function() {

                var i, results, square;
				$("form").hide();
				$("#board").empty();
				$(".alerts").removeClass("welcome").show();
				$(".alerts").text((this.getPlayerName("X")) + " Goes First");
                results = [];

                for (square = i = 0; i <= 8; square = ++i) {
					results.push($("<div>", {
                        "class": "square",
                        "id": i
					}).appendTo("#board"));
                }

                var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "http://localhost:3000/games/"+this.data.playerX+"/"+this.data.playerO,
                    "method": "POST"
                    }

                $.ajax(settings).done(function (data) {
                    return results;
                });

                var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "http://localhost:3000/games/"+this.data.playerX+"/"+this.data.playerO,
                    "method": "GET"
                    }

                $.ajax(settings).done(function(data) {

                    for (var i = 0; i < data.tiles.length; i++) {
                        if (data.tiles[i]) {
                            $('#'+i).html(data.tiles[i].toUpperCase()).addClass(data.tiles[i] + " moved");
                            Tic.data.turns++;
                        }
                    }                    
                    return results;
                });

			},

			assignRoles: function() {
				var roles;
				roles = ["X", "O"].sort(function() {
					return 0.5 - Math.random();
				});
				this.data.rolePlayerX = roles[0];
				return this.data.rolePlayerO = roles[1];
			},

			updateNotifications: function() {
				$(".notifications").empty().show();
				
                if(this.data.playerXStats)
                    this.addNotification(this.data.playerX + " has " + this.data.playerXStats.wins + " wins and " + this.data.playerXStats.loses + " loses");
                if(this.data.playerOStats)
                    this.addNotification(this.data.playerO + " has " + this.data.playerOStats.wins + " wins and " + this.data.playerOStats.loses + " loses");

                this.addNotification(this.data.playerX + " is playing " + this.data.rolePlayerX);
                return this.addNotification(this.data.playerO + " is playing " + this.data.rolePlayerO);
                
			},

			addNotification: function(msg) {
				return $(".notifications").append($("<p>", {
					text: msg
				}));
			},
            
			addListeners: function() {
				return $(".square").click(function() {
					if (Tic.data.gameOver === false && !$(this).text().length) {
                        if (Tic.data.turns % 2 === 0) {                            
							$(this).html("X").addClass("x moved");
                        }
                        else if (Tic.data.turns % 2 !== 0) {                            
							$(this).html("O").addClass("o moved");
                        }
                        var tileId = this.id;
                        var settings = {
                            "async": false,
                            "crossDomain": true,
                            "url": "http://localhost:3000/games/"+ Tic.data.playerX + "/" + Tic.data.playerO + "?tile=" + tileId,
                            "method": "PUT"
                        }

                        $.ajax(settings).done(function (response) {
                            console.log(response);
                        });;

						Tic.data.turns++;
						Tic.checkEnd();
						if (Tic.data.gameOver !== true && $(".moved").length >= 9) {
							return Tic.addToScore("none");
						}
					}
				});
			},

			checkEnd: function() {
				var col, column, diagonal, diagonals, end, i, j, k, l, len, len1, middle, ref, ref1, results, row, start;
				this.data.x = {};
				this.data.o = {};
				diagonals = [[0, 4, 8], [2, 4, 6]];
				for (i = 0, len = diagonals.length; i < len; i++) {
					diagonal = diagonals[i];
					for (j = 0, len1 = diagonal.length; j < len1; j++) {
						col = diagonal[j];
						this.checkField(col, 'diagonal');
					}
					this.checkWin();
					this.emptyStorageVar('diagonal');
				}
				results = [];
				for (row = k = 0; k <= 2; row = ++k) {
					start = row * 3;
					end = (row * 3) + 2;
					middle = (row * 3) + 1;
					this.checkField(start, 'start');
					this.checkField(middle, 'middle');
					this.checkField(end, 'end');
					this.checkWin();
					for (column = l = ref = start, ref1 = end; ref <= ref1 ? l <= ref1 : l >= ref1; column = ref <= ref1 ? ++l : --l) {
						this.checkField(column, 'horizontal');
					}
					this.checkWin();
					results.push(this.emptyStorageVar('horizontal'));
				}
				return results;
			},

			checkField: function(field, storageVar) {
				if ($(".square").eq(field).hasClass("x")) {
					if (this.data.x[storageVar] != null) {
						return this.data.x[storageVar]++;
					} else {
						return this.data.x[storageVar] = 1;
					}
				} else if ($(".square").eq(field).hasClass("o")) {
					if (this.data.o[storageVar] != null) {
						return this.data.o[storageVar]++;
					} else {
						return this.data.o[storageVar] = 1;
					}
				}
			},

			checkWin: function() {
				var key, ref, ref1, results, value;
				ref = this.data.x;
				for (key in ref) {
					value = ref[key];
					if (value >= 3) {
						localStorage.x++;
						this.showAlert((this.getPlayerName("X")) + " wins");
						this.data.gameOver = true;
						this.addToScore("X");
					}
				}
				ref1 = this.data.o;
				results = [];
				for (key in ref1) {
					value = ref1[key];
					if (value >= 3) {
						localStorage.o++;
						this.showAlert((this.getPlayerName("O")) + " wins");
						this.data.gameOver = true;
						results.push(this.addToScore("O"));
					} else {
						results.push(void 0);
					}
				}
				return results;
			},

			addToScore: function(winningParty) {

				this.data.turns = 0;
				this.data.x = {};
				this.data.o = {};
				this.data.gameOver = true;
				if (winningParty === "none") {
					this.showAlert("The game was so bored!");
				} else {
					if (this.data.rolePlayerX === winningParty) {
						++this.data.playerXStats.wins;
					} else {
						++this.data.playerXStats.loses;
					}
					if (this.data.rolePlayerO === winningParty) {
						++this.data.playerOStats.wins;
					} else {
						++this.data.playerOStats.loses;
                    }
                    
					localStorage[this.data.playerX] = JSON.stringify(this.data.playerXStats);
                    localStorage[this.data.playerO] = JSON.stringify(this.data.playerOStats);

				}
				this.updateNotifications();
				return $(".notifications").append("<a class='play-again'>Play Again?</a>");
			},

			emptyStorageVar: function(storageVar) {
				this.data.x[storageVar] = null;
				return this.data.o[storageVar] = null;
			},
            showAlert: function(msg) {
                setTimeout(function(){ 
                    $(".alerts").fadeOut();
                }, 3000);
				return $(".alerts").text(msg).slideDown();
			}
		};//Tic

        $("#enterPlayers").on("submit", function(evt) {

			var $inputs, namesIndentical, namesNotEntered;
			evt.preventDefault();
			$inputs = $("input[type='text']");
            namesNotEntered = $inputs[0].value === "" || $inputs[1].value === "";
			namesIndentical = $inputs[0].value === $inputs[1].value;
			if (namesNotEntered) {
				return Tic.showAlert("Player names cannot be empty");
			} else if (namesIndentical) {
				return Tic.showAlert("Player names cannot be identical");
            } else {
                Tic.setPlayerNames();
                //if(Tic.retrieveStats()===true) //TODO: retrieveStats should return a callback or a promise
                Tic.retrieveStats();
                    return Tic.initialize();
            }

        });

        $("#register").on("submit", function(evt) {
            evt.preventDefault();
            $('#enterPlayers').hide();
            $('#createUser').show();
        });

        $("#createUser").on("submit", function(evt) {
            evt.preventDefault();
            $inputs = $("input[type='text']");
            var user = $("input[id='user']")[0].value;
            var password = $("input[id='password']")[0].value;

            if (user === "" || password === "") {
                return Tic.showAlert("User or password cannot be empty");
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:3000/users",
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\"name\": \"" + user + "\",\"password\": \"" + password + "\"\n}"
            }

            $.ajax(settings).done(function (response) {
                Tic.showAlert(response);
            });

            $("input[id='user']")[0].value = "";
            $("input[id='password']")[0].value = "";

            $('#createUser').hide();
            $('#enterPlayers').show();
        });        

		return $("body").on("click", ".play-again", function() {
			return Tic.initialize();
        });

	});

}).call(this);

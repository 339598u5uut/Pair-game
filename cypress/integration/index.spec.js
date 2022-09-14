/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Игра в пары', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима', () => {
        cy.contains('Начать игру').click();
        cy.get('.container').find('.card').should('have.length.greaterThan', 15);
        cy.get('.container').find('.card').should('have.not.class', 'flip');
    });

    it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
        cy.contains('Начать игру').click();
        cy.get('.card').eq(7).click();
        cy.get('.card').eq(7).should('have.class', 'flip');
    });

    it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой', () => {
        cy.contains('Начать игру').click();
        cy.wait(1500);
        let counter = 1;

        function clickCards(cards) {
            cy.get(cards[0]).click();
            cy.get(cards[counter]).click();
            if (cards[0].dataset.number === cards[counter].dataset.number) {
                cy.get(cards[0]).should('have.class', 'flip');
                cy.get(cards[counter]).should('have.class', 'flip');
            } else {
                counter++;
                cy.wait(1000);
                clickCards(cards);
            }
        }
        cy.get('.card').then(($cards) => {
            clickCards($cards);
        })
    });

    it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми', () => {
        cy.contains('Начать игру').click();
        cy.wait(1500);
        let arr = []

        cy.get('ul>li').each((el) => {
            let value;
            cy.wait(500);
            cy.wrap(el).click().invoke('attr', 'data-number').then(attr => {
                value = attr;
                arr.push(value);

                if (arr.length >= 2) {
                    if (arr[0] !== arr[1]) {
                        cy.get('.container').should('have.not.class', 'flip').and('have.length.gte', 1);
                        return false;
                    }
                    arr.splice(0, 2);
                }
            });
        })
    });
});

//Вариант 2, длинный))
// function getClassFlip(eq_1, eq_2) {
//     cy.get('.card').eq(eq_1).should('have.class', 'flip');
//     cy.get('.card').eq(eq_2).should('have.class', 'flip');
//     cy.log(eq_1 === eq_2, 'eq_2');
// };

// function cardInvisible(eq_1, eq_2) {
//     cy.get('.card').eq(eq_1).should('have.not.class', 'flip');
//     cy.get('.card').eq(eq_2).should('have.not.class', 'flip');
// }

// const clickCard = (eq) => cy.get('.card').eq(eq).click().invoke('text');

// describe('Игра в пары', () => {
//     beforeEach(() => {
//         cy.visit('http://localhost:3000');
//     });

//     it('Цепочка тестов', () => {

//         //В начальном состоянии игра должна иметь поле четыре на четыре клетки
//         cy.contains('Начать игру').click();
//         cy.get('.container').find('.card').should('have.length.greaterThan', 15);

//         //в каждой клетке цифра должна быть невидима
//         cy.get('.container').find('.card').should('have.not.class', 'flip');

//         //старт игры
//         cy.get('.container').within(() => {
//             let number7;
//             let number0;
//             let number1;
//             let number2;
//             let number3;
//             let number4;
//             let number5;
//             let number6;
//             let number8;
//             let number9;
//             let number10;
//             let number11;
//             let number12;
//             let number13;
//             let number14;
//             let number15;

//             //Нажать на одну произвольную карточку.
//             clickCard(7).then(text => {
//                 number7 = text; //так получаю номер карты
//                 //Убедиться, что она осталась открытой.
//                 cy.get('.card').eq(7).should('have.class', 'flip');
//             });

//             //Нажать на левую верхнюю карточку,
//             clickCard(0).then(text => {
//                 number0 = text;
//             });
//             //нажать на следующую
//             clickCard(1).then(text => {
//                 number1 = text;
//                 if (number7 === number0) {
//                     getClassFlip(7, 0);
//                 } else {
//                     //Если это не пара, убедиться,что карты перевернулись обратно
//                     cardInvisible(7, 0);
//                     //...и повторять со следующей карточкой, пока не будет найдена пара.
//                     clickCard(2).then(text => {
//                         number2 = text;
//                         if (number1 === number2) {
//                             getClassFlip(1, 2);
//                         }
//                     });
//                     clickCard(3).then(text => {
//                         number3 = text;
//                     })
//                     clickCard(4).then(text => {
//                         number4 = text;
//                         if (number3 === number4) {
//                             getClassFlip(3, 4);
//                         }
//                     });
//                     clickCard(5).then(text => {
//                         number5 = text;
//                     })
//                     clickCard(6).then(text => {
//                         number6 = text;
//                         if (number5 === number6) {
//                             getClassFlip(5, 6);
//                         }
//                     })
//                     clickCard(7).then(text => {
//                         number7 = text;
//                     });
//                     clickCard(8).then(text => {
//                         number8 = text;
//                         if (number7 === number8) {
//                             getClassFlip(7, 8);
//                         }
//                     })
//                     clickCard(9).then(text => {
//                         number9 = text;
//                     });
//                     clickCard(10).then(text => {
//                         number10 = text;
//                         if (number9 === number10) {
//                             getClassFlip(9, 10);
//                         }
//                     });
//                     clickCard(11).then(text => {
//                         number11 = text;
//                     })
//                     clickCard(12).then(text => {
//                         number12 = text;
//                         if (number11 === number12) {
//                             getClassFlip(11, 12);
//                         }
//                     })
//                     clickCard(13).then(text => {
//                         number13 = text;
//                     });
//                     clickCard(14).then(text => {
//                         number14 = text;
//                         if (number13 === number14) {
//                             getClassFlip(13, 14);
//                         }
//                     })
//                     clickCard(15).then(text => {
//                         number15 = text;
//                     });
//                     clickCard(0).then(text => {
//                         number0 = text;
//                         if (number15 === number0) {
//                             getClassFlip(15, 0);
//                         }
//                     });
//                 }
//             });
//         });
//     });
// });

// тест N3 вариант еще один
// it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой', () => {
//   cy.contains('Начать игру').click();
//   cy.wait(1500);
//   let arr = []
//   let arrWin = []

//   cy.get('ul>li').each((el) => {
//       let value;
//       cy.wait(500);
//       cy.wrap(el).click().invoke('attr', 'data-number').then(attr => {
//           value = attr;
//           arr.push(value);
//           if (arr.length >= 2) {
//               if (arr[0] === arr[1]) {
//                   arrWin.push(arr[0]);
//                   arrWin.push(arr[1]);
//                   cy.get('.container').find('.flip').should('have.length.gte', 1);
//                   return false;
//               }
//               arr.splice(0, 2);
//           }
//       });
//   })
// })

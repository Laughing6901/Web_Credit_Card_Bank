
import { Injectable } from '@nestjs/common';
import { cardType, typeCardToSearch } from '../dto/cardType.dto';
import { CardRepository } from '../repositories/card.repository';
import { Cards } from '../entities/card.entity';

@Injectable()
export class SearchCard {
    constructor(
        private cardRepository: CardRepository
    ) {}

    findCardTypeId(typeRequest: string) {
        let cardTypeId = ["Normal","Visa", "MasterCard", "VisaDebit"]
        for ( let i in cardTypeId){
            if (typeRequest == cardTypeId[i])
                return Number(i) +1
        }
    }

    async searchOneCard(cardRequest: typeCardToSearch): Promise<any> {
        let cardTypeId = this.findCardTypeId(cardRequest.CardType);
        let cardRes:Cards = await this.cardRepository.findOne({
            where: {
                Account: cardRequest.Account,
                CardType: cardTypeId
            }
        });
        return cardRes
        
    }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IdentifyDto } from './dto/identify-contact.dto';


enum linkedPrecedence {
    primary = "PRIMARY",
    secondary = "SECONDARY"
}
@Injectable()
export class IdentifyService {
    constructor(private prisma: PrismaService) { }

    async getContact(data: IdentifyDto) {

        if (!data.email && !data.phoneNumber) {
            throw new Error("At least one of email or phoneNumber must be provided.");
        }
        const conditions = [];
        if (data.email) {
            conditions.push({ email: data.email });
        }
        if (data.phoneNumber) {
            conditions.push({ phoneNumber: data.phoneNumber });
        }

        let existingContact =await this.prisma.contact.findFirst({
            where: {
                OR: conditions,
            },
        });

        if (existingContact) {
            if (existingContact.email !== data.email || existingContact.phoneNumber !== data.phoneNumber) {

                let secondaryContact = await this.prisma.contact.create({
                    data: {
                        email: data.email ? data.email : existingContact.email,
                        phoneNumber: data.phoneNumber ? data.phoneNumber : existingContact.phoneNumber,
                        linkedId: existingContact.linkedId ? existingContact.linkedId : existingContact.id,
                        linkPrecedence: linkedPrecedence.secondary,
                    },
                });
                return this.getConsolidatedContactInfo(existingContact.linkedId ? existingContact.linkedId : existingContact.id);
            } else {
                return this.getConsolidatedContactInfo(existingContact.id);
            }
        } else {
            let newPrimaryContact = await this.prisma.contact.create({
                data: {
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    linkPrecedence: linkedPrecedence.primary,
                },
            });
            return this.getConsolidatedContactInfo(newPrimaryContact.id);
        }
    }

    private async getConsolidatedContactInfo(primaryContactId: number) {
        const primaryContact = await this.prisma.contact.findUnique({
            where: { id: primaryContactId },
        });

        const secondaryContacts = await this.prisma.contact.findMany({
            where: { linkedId: primaryContactId },
        });

        return {
            contact: {
                primaryContactId: primaryContact.id,
                emails: [primaryContact.email, ...secondaryContacts.map(c => c.email)].filter(Boolean),
                phoneNumbers: [primaryContact.phoneNumber, ...secondaryContacts.map(c => c.phoneNumber)].filter(Boolean),
                secondaryContactIds: secondaryContacts.map(c => c.id),
            }
        };
    }
}
import { MigrationInterface, QueryRunner } from 'typeorm';


export const Category = [
    {
        name: "Technology",
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`
    },
    {
        name: "Business",
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`
    },
    {
        name: "Politics",
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`
    },
    {
        name: "Sports",
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`
    }
];
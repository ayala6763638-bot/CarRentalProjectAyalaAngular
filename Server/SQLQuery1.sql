-- מחיקת הטבלה הקיימת (זהירות: זה מוחק נתונים בטבלה הזו בלבד)
DROP TABLE [dbo].[Rents];

-- יצירה מחדש עם כל התיקונים: IDENTITY ועמודת codePayment
CREATE TABLE [dbo].[Rents] (
    [code]         INT           IDENTITY (1, 1) NOT NULL,
    [codeCustomer] INT           NOT NULL,
    [codeCar]      INT           NOT NULL,
    [codePayment]  INT           NOT NULL,
    [startDate]    DATETIME      NOT NULL,
    [endDate]      DATETIME      NOT NULL,
    [goal]         NVARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([code] ASC),
    CONSTRAINT [FK_Rents_Cars] FOREIGN KEY ([codeCar]) REFERENCES [dbo].[Cars] ([code]),
    CONSTRAINT [FK_Rents_Customers] FOREIGN KEY ([codeCustomer]) REFERENCES [dbo].[Customers] ([Id]),
    CONSTRAINT [FK_Rents_Payments] FOREIGN KEY ([codePayment]) REFERENCES [dbo].[Payments] ([code])
);
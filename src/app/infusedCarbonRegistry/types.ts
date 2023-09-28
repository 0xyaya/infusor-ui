export type InfusedCarbonRegistry = {
  version: '0.1.0';
  name: 'infused_carbon_registry';
  instructions: [
    {
      name: 'initialize';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'holdingAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'feesAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'staleness';
          type: 'u64';
        }
      ];
    },
    {
      name: 'infuse';
      accounts: [
        {
          name: 'globalRegistry';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'nftMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'infusedAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'holdingAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'feesAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'solUsdPriceFeed';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'nctUsdPriceFeed';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
        {
          name: 'nctUsdPrice';
          type: 'f64';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'globalRegistryState';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'holdingAccount';
            type: 'publicKey';
          },
          {
            name: 'feesAccount';
            type: 'publicKey';
          },
          {
            name: 'feedStalenessThreshold';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'infusedAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'nftMint';
            type: 'publicKey';
          },
          {
            name: 'carbonScore';
            type: 'u64';
          },
          {
            name: 'lastInfusedTime';
            type: 'u64';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'GlobalRegistryParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'holdingAccount';
            type: 'publicKey';
          },
          {
            name: 'feesAccount';
            type: 'publicKey';
          },
          {
            name: 'feedStalenessThreshold';
            type: 'u64';
          }
        ];
      };
    }
  ];
};

export const IDL: InfusedCarbonRegistry = {
  version: '0.1.0',
  name: 'infused_carbon_registry',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'holdingAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'feesAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'staleness',
          type: 'u64',
        },
      ],
    },
    {
      name: 'infuse',
      accounts: [
        {
          name: 'globalRegistry',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'infusedAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'holdingAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'feesAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'solUsdPriceFeed',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nctUsdPriceFeed',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'nctUsdPrice',
          type: 'f64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'globalRegistryState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'holdingAccount',
            type: 'publicKey',
          },
          {
            name: 'feesAccount',
            type: 'publicKey',
          },
          {
            name: 'feedStalenessThreshold',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'infusedAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'nftMint',
            type: 'publicKey',
          },
          {
            name: 'carbonScore',
            type: 'u64',
          },
          {
            name: 'lastInfusedTime',
            type: 'u64',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'GlobalRegistryParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'holdingAccount',
            type: 'publicKey',
          },
          {
            name: 'feesAccount',
            type: 'publicKey',
          },
          {
            name: 'feedStalenessThreshold',
            type: 'u64',
          },
        ],
      },
    },
  ],
};

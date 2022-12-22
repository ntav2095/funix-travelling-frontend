const template = {
  language: "vi",
  name: "Dịch vụ làm Visa ccc ttt",
  type: "travel",
  country: "it",
  detail: {
    ops: [
      {
        insert: "Rất tuyệt vời\n",
      },
    ],
  },
  price: 20000,
  price_policies: {
    includes: {
      ops: [
        {
          insert: "Rất tuyệt vời\n",
        },
      ],
    },
    excludes: {
      ops: [
        {
          insert: "Rất tuyệt vời\n",
        },
      ],
    },
    other: {
      ops: [
        {
          insert: "Rất tuyệt vời\n",
        },
      ],
    },
  },
  terms: {
    registration: {
      ops: [
        {
          insert: "Rất tuyệt vời\n",
        },
      ],
    },
    cancellation: {
      ops: [
        {
          insert: "Rất tuyệt vời\n",
        },
      ],
    },
    payment: {
      ops: [
        {
          insert: "Rất tuyệt vời\n",
        },
      ],
    },
    notes: {
      ops: [
        {
          insert: "Rất tuyệt vời\n",
        },
      ],
    },
  },
  translation: [
    {
      language: "en",
      name: "Visa service ccc ttt",
      detail: {
        ops: [
          {
            insert: "perfect\n",
          },
        ],
      },
      price_policies: {
        includes: {
          ops: [
            {
              insert: "perfect\n",
            },
          ],
        },
        excludes: {
          ops: [
            {
              insert: "perfect\n",
            },
          ],
        },
        other: {
          ops: [
            {
              insert: "perfect\n",
            },
          ],
        },
      },
      terms: {
        registration: {
          ops: [
            {
              insert: "perfect\n",
            },
          ],
        },
        cancellation: {
          ops: [
            {
              insert: "perfect\n",
            },
          ],
        },
        payment: {
          ops: [
            {
              insert: "perfect\n",
            },
          ],
        },
        notes: {
          ops: [
            {
              insert: "perfect\n",
            },
          ],
        },
      },
    },
  ],
};

const countries = [
  {
    code: "it",
    name: {
      vi: "Ý",
      en: "Italy",
    },
  },
  {
    code: "fr",
    name: {
      vi: "Pháp",
      en: "France",
    },
  },
  {
    code: "ch",
    name: {
      vi: "Thụy Sỹ",
      en: "Switzerland",
    },
  },
  {
    code: "va",
    name: {
      vi: "Vatican",
      en: "Vatican",
    },
  },
];

const types = [
  {
    code: "travel",
    name: {
      en: "Tourist, Business, Visiting relatives",
      vi: "Du Lịch, Công Tác, Thăm Thân",
    },
  },
  {
    code: "finance-proving",
    name: {
      en: "finance demonstrating",
      vi: "chứng minh tài chính",
    },
  },
  {
    code: "job-proving",
    name: {
      en: "job demonstrating",
      vi: "chứng minh nghề nghiệp",
    },
  },
  {
    code: "fillout-declaration",
    name: {
      en: "filling out declaration",
      vi: "điền tờ đơn",
    },
  },
  {
    code: "translation",
    name: {
      en: "translation",
      vi: "dịch thuật văn phòng",
    },
  },
];

const x = [];
for (const country of countries) {
  for (const type of types) {
    let t = JSON.stringify(template);
    t = JSON.parse(t);

    t.country = country.code;
    t.name = template.name.replace("ccc", country.name.vi);
    t.name = t.name.replace("ttt", type.name.vi);
    t.translation[0].name = template.translation[0].name.replace(
      "ccc",
      country.name.en
    );
    t.translation[0].name = t.translation[0].name.replace(
      "ttt",
      type.name.code
    );
    t.type = type.code;
    x.push(t);
  }
}

export default x;

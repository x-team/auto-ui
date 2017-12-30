Standard use:

```js
<FooterList
  title="List Example"
  items={[
    {
      label: `Item 1 (hidden on desktop (> 1024px))`,
      url: '/foo1',
      mobileOnly: true
    },
    {
      label: 'Item 2 (hidden on desktop (> 1024px))',
      url: '/foo2',
      mobileOnly: true
    },
    {
      label: 'Item 3',
      url: '/foo3'
    },
    {
      label: 'Item 4',
      url: '/foo4'
    },
    {
      label: 'Item 5',
      url: '/foo5'
    },
    {
      label: 'Item 6',
      url: '/foo6'
    }
  ]}
/>
```

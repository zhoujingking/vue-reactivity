bad: we're calling track and trigger manually

solution:
When running an effect if product properties are accessed (GET),
    then call track(product, <property>) -- save this effect

If product properties are changed (SET)
    then call trigger(product, <property>)

How to intercept GET & SET
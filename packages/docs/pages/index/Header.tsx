import { Badge, Button, Flexbox, Grid, Header, Paragraph, Text, useTheme } from '@stage-ui/core'
import { Moon } from '@stage-ui/icons'
import React from 'react'
import { CustomPageProps } from '../../utils/core'

export default (props: CustomPageProps) => {
  const theme = useTheme()
  return (
    <Flexbox
      justifyContent="center"
      alignItems="center"
      h="100vh"
      pb="6rem"
      css={{
        [`@media (max-width: ${theme.breakpoints[3]})`]: {
          flexDirection: 'column-reverse',
        },
      }}
    >
      <div className="background_light" />
      <div className="background_light background_light_1" />
      <div className="background_light background_light_2" />

      <Flexbox
        column
        justifyContent="center"
        w="25rem"
        mr={['3rem', '3rem', '3rem', '0']}
        css={{
          [`@media (max-width: ${theme.breakpoints[3]})`]: {
            width: 'auto',
            textAlign: 'center',
          },
        }}
      >
        <Header m="0" size="6.5rem" lineHeight={1} weight={800}>
          <span>StageUI</span>
          <Text
            size="xl"
            weight={500}
            css={{
              verticalAlign: 'text-top',
            }}
            textColor={(c) => c.primary}
          >
            β
          </Text>
        </Header>
        <Paragraph size="l" color={(c) => c.light}>
          Flexible UI Framework declared by your own Design System.
        </Paragraph>
        <Grid
          mt="xl"
          templateColumns={['1fr 1fr', '1fr 1fr', '1fr']}
          rowGap="2rem"
          columnGap="1rem"
          justifyItems="center"
        >
          <Button w="12rem" size="l" onClick={() => props.setPath('/getting-started')} children="Getting started" />
          <Badge content="preview" size="xs">
            <Button w="12rem" size="l" color={(c) => c.lightest} onClick={() => props.setPath('/editor')}>
              Visual editor
            </Button>
          </Badge>
        </Grid>

        <Flexbox alignItems="center" justifyContent="center" mt="4rem">
          <Moon
            size="3rem"
            onClick={() => {
              props.setTheme(props.themes[props.theme.name === 'Dark' ? 'light' : 'dark'])
            }}
            color={props.theme.name === 'Dark' ? 'primary' : 'lightest'}
          />
        </Flexbox>
      </Flexbox>
      {/* <Flexbox
                flex={1}
                css={{ height: '100%' }}
                justifyContent={['flex-end', 'flex-end', 'center']}>
                <svg
                    viewBox="0 0 294.41 445.41"
                    xmlns="http://www.w3.org/2000/svg"
                    css={{
                        maxWidth: '24rem',
                        width: '100%',
                        justifySelf: 'flex-end',
                        fill: theme.color.onBackground.rgb().string(),
                        [`@media (max-width: ${theme.breakpoints[3]})`]: {
                            width: '12rem',
                        }
                    }}>
                    <path css={{ fill: theme.color.primary.rgb().string() }} d="m228.93 24.34a112.66 112.66 0 0 0 -29.03-24.14 1.51 1.51 0 0 0 -2 .45 1.5 1.5 0 0 0 .49 2.17c35 20.1 58 61.94 58 100.46 0 29.11-10 55.71-28.2 74.93s-43.5 29.85-71.2 29.85c-45.41 0-85.38-29.66-101.26-70.28a1.49 1.49 0 0 0 -2.05-.81 1.53 1.53 0 0 0 -.77 1.92c16.33 41.74 57.41 72.21 104.08 72.21 28.54 0 54.61-10.94 73.41-30.8s29-47.13 29-77c.04-27.84-11.08-56.63-30.47-78.96z" />
                    <path d="m131.25 144.43a63 63 0 0 0 -17.14-35.62 1.52 1.52 0 0 0 -2.16 0 1.51 1.51 0 0 0 0 2.12 59.13 59.13 0 0 1 14.55 57.07 54.43 54.43 0 0 1 -36.89 37.57 59 59 0 0 1 -54.91-11.47 1.5 1.5 0 0 0 -2.09.14 1.51 1.51 0 0 0 .14 2.17 62.88 62.88 0 0 0 30.06 13.86c38.7 6.35 73.35-26.93 68.44-65.84z" />
                    <ellipse cx="33.55" cy="429.61" rx="14.59" ry="15.82" transform="matrix(.99349258 -.11389683 .11389683 .99349258 -48.74 6.62)" />
                    <path css={{ fill: theme.color.light.rgb().string() }} d="m150.5 184a1.52 1.52 0 0 0 -1.27-1.49c-29.92-5.18-52.78-31.78-52.78-63.73 0-35.65 28.46-64.65 63.44-64.65a62 62 0 0 1 22.11 4.03 1.52 1.52 0 0 0 1.9-.71 1.53 1.53 0 0 0 -.8-2.12 65.09 65.09 0 0 0 -23.2-4.27c-36.66 0-66.48 30.37-66.48 67.69 0 33.45 24 61.3 55.32 66.72a1.53 1.53 0 0 0 1.77-1.5z" />
                    <path d="m294.41 75.4a.53.53 0 0 0 -.54-.52c-153.63 5.37-276.42 124.06-276.42 269.71a182.11 182.11 0 0 0 4.55 41.51.52.52 0 0 0 1-.14c-.19-4.67-.41-12.87-.41-25.58.06-149.08 119.51-269.92 266.87-269.92 1.48 0 3 0 4.42.05a.52.52 0 0 0 .53-.52z" />
                    <path d="m83.46 275.19a1.5 1.5 0 0 0 -1.71-1.35 69.14 69.14 0 0 1 -8.56.55c-38.68 0-70.15-34.54-70.15-77a82.27 82.27 0 0 1 10.14-39.81 1.5 1.5 0 0 0 -.61-2.07 1.51 1.51 0 0 0 -2 .6 85.17 85.17 0 0 0 -10.57 41.28c0 44.13 32.83 80 73.19 80a69.87 69.87 0 0 0 9-.58 1.52 1.52 0 0 0 1.31-1.66z" />
                    <path css={{ fill: theme.color.primary.rgb().string() }} d="m98.14 190.14a112.06 112.06 0 0 1 -42.4-52.31 1.49 1.49 0 0 0 -2.05-.81 1.53 1.53 0 0 0 -.77 1.92 115.18 115.18 0 0 0 43.42 53.63z" />
                    <path d="m114.11 108.81a1.51 1.51 0 0 0 -2.17 2.11 59.1 59.1 0 0 1 14.63 56.81h2.91a58 58 0 0 0 1.77-23.3 63 63 0 0 0 -17.14-35.62z" />
                </svg>
            </Flexbox> */}
    </Flexbox>
  )
}

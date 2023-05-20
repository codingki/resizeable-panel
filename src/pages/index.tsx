import { Box, Flex, Input, Stack, Text, calc } from "@chakra-ui/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useState } from "react";
import useMeasure from "react-use-measure";

export default function Home() {
  const [ref, bounds] = useMeasure();

  return (
    <Flex
      h="100vh"
      w="full"
      border="solid 1px yellow"
      direction="row"
      ref={ref}
    >
      <Box
        as={motion.div}
        h="full"
        border="solid 1px green"
        style={{ width: "300px" }}
      >
        300px
      </Box>
      <Panel minWidth={100} parentWidth={bounds.width} key={1}>
        <Text>MinWidth: 100px</Text>
        <br />
      </Panel>
      <Box
        as={motion.div}
        h="full"
        border="solid 1px green"
        style={{ width: "300px" }}
      >
        300px
      </Box>
    </Flex>
  );
}

const Panel = (props: {
  children: ReactNode;
  minWidth: number;
  parentWidth: number;
}) => {
  const width = useMotionValue(props.minWidth);
  const [ref, bounds] = useMeasure();

  const min = bounds.left + props.minWidth;
  const max = props.parentWidth - 300;
  return (
    <Box
      ref={ref}
      as={motion.div}
      h="full"
      border="solid 1px red"
      style={{ width: width }}
    >
      {props.children}
      bounds{" "}
      {Object.entries(bounds).map(([k, v]) => {
        return <Text key={k}>{k + ": " + v + " "}</Text>;
      })}
      <Text>width {width.get()}</Text>
      <Box
        as={motion.div}
        h="full"
        w="10px"
        dragMomentum={false}
        drag="x"
        bgColor="none"
        cursor="ew-resize"
        // @ts-expect-error
        onDrag={(_, info) => {
          info.point.x > max
            ? width.set(max - info.point.x)
            : info.point.x < min
            ? width.set(props.minWidth)
            : width.set(info.point.x - bounds.left);
        }}
        style={{ x: bounds.left + width.get() }}
        top="0"
        left="-5px"
        position="absolute"
        dragConstraints={{
          left: min,
          right: max,
        }}
        dragElastic={0}
        whileHover={{
          backgroundColor: "red",
        }}
        whileDrag={{
          backgroundColor: "blue",
        }}
      ></Box>
    </Box>
  );
};
